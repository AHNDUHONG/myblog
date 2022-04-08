---
title: "파이썬 기초 문법 3"
author: "winters"
date: '2022-03-22'
---

## 클래스를 만드는 목적!
- 코드의 간결화!
  + 코드를 재사용!
- 여러 라이브러리 --> 클래스로 구현이 됨
  + list 클래스, str 클래스, 
  + 객체로 씀
  + 변수명으로 정의!
- 여러 클래스들이 모여서 하나의 라이브러리가 됨.
  + 장고(django) / 웹개발 / 머신러닝 / 시각화 / 데이터 전처리

## instance 메서드 생성
- list.append(), list.extend()


```python
class Person:      # 대문자소문자 입력.
  
  # class attribute
  country = "korean"

  # instance attribute
  def __init__(self, name, age):   # def __init__(self) 고정적 default
    self.name = name
    self.age = age

  # instance method 정의
  def singing(self,songtitle, sales):
    return "{} 판매량 {} 된 {}을 노래합니다.".format(self.name, sales, songtitle)

if __name__ == "__main__":
  kim = Person("Kim", 100)
  lee = Person("Lee", 100)

  # access class attribute
  print("kim은 {}".format(kim.__class__.country))
  print("lee는 {}".format(lee.__class__.country))

  # call instance
  print(kim.singing("A", 10))
  print(lee.singing("B", 200))
```

    kim은 korean
    lee는 korean
    Kim 판매량 10 된 A을 노래합니다.
    Lee 판매량 200 된 B을 노래합니다.
    

## 클래스 상속



```python
class Parent:
  # instance attribute
  def __init__(self, name, age):
    self.name = name
    self.age = age

  # instance method 정의
  def whoAmI(self):
    print(" I am Parent!!")

  def singing(self,songtitle):
    return "{} {}을 노래합니다.".format(self.name, songtitle)

  def dancing(self):
    return "{} 현재 춤을 춥니다.".format(self.name)

class Child(Parent):
  def __init__(self, name, age):
    # super() function
    super().__init__(name, age)
    print("Child Class is ON")

  def whoAmI(self):
    print("I am Child")

  def studying(self):
    print("I am Fast Runner")


if __name__ == "__main__":
  child_kim = Child("kim", 15)
  parent_kim = Parent("kim", 45)
  print(child_kim.dancing())
  print(child_kim.singing("연애"))
  #print(parent_kim.studying()) # AttributeError: 'Parent' object has no attribute 'studying' **parent 클래스에 정의 되어있지 않아서 에러가 남"
  child_kim.whoAmI()
  parent_kim.whoAmI()
```

    Child Class is ON
    kim 현재 춤을 춥니다.
    kim 연애을 노래합니다.
    I am Child
     I am Parent!!
    


```python
class TV:

  # init constructor
  def __init__(self):
    self.__maxprice = 500

  def sell(self):
    print("Selling Price: {}".format(self.__maxprice))

  def setMaxPrice(self, price):
    self.__maxprice = price

if __name__ == "__main__":
  tv = TV()
  tv.sell()

  # change price
  # 안 바뀌는 코드의 예시
  tv.__maxprice = 1000
  tv.sell()

  # setMaxPrice
  # 값을 바꿀 수있다!? 외부의 입력값을 업데이트 할 수 있다!
  tv.setMaxPrice(1000)
  tv.sell()
```

    Selling Price: 500
    Selling Price: 500
    Selling Price: 1000
    

## 클래스 내부에  조건문
- init constructor에 조건문을 써보자!


```python
class Employee:

  # init constructor
  # nmae , salary
  def __init__(self, name, salary = 0):
    self.name = name

    # 조건문 추가
    if salary > 0:
      self.salary = salary
    else:
      self.salary = 0
      print("급여는 0원이 될수 없다!. 다시 입력하십시오!!")

  def update_salary(self, amount):
    self.salary += amount

  def weekly_salary(self):
    return self.salary / 7

if __name__ == "__main__":
  emp01 = Employee("Winters", -50000)
  print(emp01.name)
  print(emp01.salary)
  emp01.salary += 1500
  print(emp01.salary)
  emp01.update_salary(3000)
  print(emp01.salary)
  week_salary = emp01.weekly_salary()
  print(week_salary)
```

    급여는 0원이 될수 없다!. 다시 입력하십시오!!
    Winters
    0
    1500
    4500
    642.8571428571429
    

## 클래스 Docstring


```python
class Person:
  """
  사람을 표현하는 클래스
  

 
  Attributes
  ------------
  name : str
    name of the person

  age : int
    age of the person

  Methods
  -------------
 
  info(additional=""):
    prints the person's name and age
  """
  def __init__(self, name, age):
    """
    Constructs all the neccessary attributes for the person object
  
    Parameters(매개변수)
    -------------------------
      name : str
        name of the person

      age : int
        age of the person
    """

    self.name = name
    self.age = age

  def info(self, additional = None):
    """
    귀찮음...
    
    Parameters
    --------------
      additional : str, optional
        more info to be displayed (Default is None) / A, B, C


    Returens
    -----------
      None

    """

    print(f'My name is {self.name}. I am {self.age} years old. ' + additional)

if __name__ == "__main__":
    person = Person("Evan", age = 20)
    person.info("나의 직장은 00이야")
    help(Person)
```

    My name is Evan. I am 20 years old. 나의 직장은 00이야
    Help on class Person in module __main__:
    
    class Person(builtins.object)
     |  Person(name, age)
     |  
     |  사람을 표현하는 클래스
     |  
     |  
     |  
     |  Attributes
     |  ------------
     |  name : str
     |    name of the person
     |  
     |  age : int
     |    age of the person
     |  
     |  Methods
     |  -------------
     |  
     |  info(additional=""):
     |    prints the person's name and age
     |  
     |  Methods defined here:
     |  
     |  __init__(self, name, age)
     |      Constructs all the neccessary attributes for the person object
     |      
     |      Parameters(매개변수)
     |      -------------------------
     |        name : str
     |          name of the person
     |      
     |        age : int
     |          age of the person
     |  
     |  info(self, additional=None)
     |      귀찮음...
     |      
     |      Parameters
     |      --------------
     |        additional : str, optional
     |          more info to be displayed (Default is None) / A, B, C
     |      
     |      
     |      Returens
     |      -----------
     |        None
     |  
     |  ----------------------------------------------------------------------
     |  Data descriptors defined here:
     |  
     |  __dict__
     |      dictionary for instance variables (if defined)
     |  
     |  __weakref__
     |      list of weak references to the object (if defined)
    
    
