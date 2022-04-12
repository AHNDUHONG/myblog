---
title: "파이썬 기초 문법 1"
author: "winters"
date: '2022-03-21'
categories: 'Education'
tags: 'edu'
---

```python
print('hello world!')
```

    hello world!
    

# 주석처리
- 코드 작업 시, 특정 코드에 대해 설명
- 사용자 정의 함수 작성 시, 클래스 작성 시.. (도움말 작성..)

# 변수 (Scalar)
- 객체 (Object)로 구현이 됨
  + 하나의 자료형 (Type)을 가진다.
  + 클래스로 정의가 됨.
    - 다양한 함수들이 존재 함.

## int
- int 정수를 표한하는데 사용함.


```python
num_int = 1
print(num_int)
print(type(num_int))
```

    1
    <class 'int'>
    

## float
- 실수를 표현하는데 사용한다.


```python
num_float = 0.2
print(num_float)
print(type(num_float))
```

    0.2
    <class 'float'>
    

## bool
- True와 False로 나타내는 Boolean 값을 표현하는데 사용한다.


```python
bool_true = True
print(bool_true)
print(type(bool_true))
```

    True
    <class 'bool'>
    

## None
- Null을 나타내는 자료형으로 Nonen이라는 한 가지 값만 가집니다.


```python
none_x = None
print(none_x)
print(type(none_x))
```

    None
    <class 'NoneType'>
    

# 사칙연산
- 정수형 사칙 연산


```python
a = 2
b = 4
print('a + b = ', a + b)
print('a % b = ', a % b)
print('a / b = ', a / b) # 나누기를 했을때 type이 실수형(float)으로 바뀜.
```

    a + b =  6
    a % b =  2
    a / b =  0.5
    

# 논리형 연산자
- Bool 형은 True와 False 값으로 정의
- AND / OR


```python
x = 5 > 4
y = 3 > 4
print(x and x)
print(x and y)
print(y and x)
print(y and y)
print("-----")
print(x or x)
print(x or y)
print(y or x)
print(y or y)
```

    True
    False
    False
    False
    -----
    True
    True
    True
    False
    

# 비교 연산자
- 부등호를 의미합니다.
- 비교 연산자를 True와 False값을 도출

## 논리 & 비교 연산자 응용


```python
var = input("입력하여 주세요....")
print(type(var))
```

    입력하여 주세요....5
    <class 'str'>
    

- 형변환을 해준다.
- 문자열, 정수, 실수 등등


```python
var = int("1")
print(type(var))
```

    <class 'int'>
    


```python
var = int(input("숫자를 입력하여 주세요"))
print(type(var))
```

    숫자를 입력하여 주세요3
    <class 'int'>
    


```python
num1 = int(input("숫자를 입력하여 주세요"))
num2 = int(input("숫자를 입력하여 주세요"))

print(num1 > num2)
```

    숫자를 입력하여 주세요10
    숫자를 입력하여 주세요5
    True
    


```python
num1 = int(input("숫자를 입력하여 주세요"))
num2 = int(input("숫자를 입력하여 주세요"))
num3 = int(input("숫자를 입력하여 주세요"))
num4 = int(input("숫자를 입력하여 주세요"))

var1 = num11 >= num2 #True
var2 = num3 < num4 #True
print(var1 and var2)
print(var1 or var2)
```

    숫자를 입력하여 주세요20
    숫자를 입력하여 주세요15
    숫자를 입력하여 주세요3
    숫자를 입력하여 주세요5
    True
    True
    

# 변수 (Non Scalar)
- 문자열을 입력


```python
print("'Hello, World'")
print('"Hello, World"')
```

    'Hello, World'
    "Hello, World"
    

## String 연산자
- 덧셈 연산자를 써보자.


```python
str1 = "Hello "
str2 = "World!"
print(str1 + str2)
```

    Hello World!
    

## Indexing
- 문자열 인덱싱은 각각의 문자열 안에서 범위를 지정하여 특정 문자를 추린다


```python
greeting = "Hello Kaggle!"
print(greeting[6])
```

    K
    

## 리스트
- 시퀀스 데이터 타입
- 데이터에 순서가 존재하는지, 슬라이싱이 가능하는지
- 대괄호 ('[값]')


```python
a = [] # 빈 리스트
a_func = list() # 빈 리스트 생성
b = [1] # 숫자가 요소가 될 수 있다.
c = ['apple'] # 문자열도 요소가 될 수 있다.
d = [1, 2, ['apple']] # 리스트 안에 또 다른 리스트를 요소로 넣을 수 있다.

print(a)
print(a_func)
print(b)
print(c)
print(d)
print(type(d))
```

    []
    []
    [1]
    ['apple']
    [1, 2, ['apple']]
    <class 'list'>
    

## 리스트 슬라이싱


```python
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(a[0])
```

    1
    


```python
a =[ ["apple", "banana", "cherry"], 1]
print(a[0][2][2])
```

    e
    


```python
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(a[::-1]) # 역순
print(a[::2])
```

    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    [1, 3, 5, 7, 9]
    

## 리스트 연산자


```python
a = ["john", "evan"]
b = ["alice", "eva"]

c = a + b
print(c)
```

    ['john', 'evan', 'alice', 'eva']
    


```python
c = a * 3
d = b * 0
print("a * 3 = ", c)
print("b * 0 = ", d)
```

    a * 3 =  ['john', 'evan', 'john', 'evan', 'john', 'evan']
    b * 0 =  []
    

## 리스트 수정 및 삭제


```python
a = [0, 1, 2]
a[1] = "b"
print(a)
```

    [0, 'b', 2]
    

## 리스트 값 추가하기


```python
a = [100, 200, 300]
a.append(400)
print(a)

# a.append([500, 600])
# print(a)

a.extend([500, 600])
print(a)
```

    [100, 200, 300, 400]
    [100, 200, 300, 400, 500, 600]
    


```python
a = [0, 1, 2]
# a.insert(인덱스번호, 넣고자하는 값)
a.insert(1, 100)
print(a)
```

    [0, 100, 1, 2]
    

## 리스트 값 삭제하기


```python
a = [1, 2, 3, 4, "A"]
a.remove(1)
print(a)
a.remove("A")
print(a)
```

    [2, 3, 4, 'A']
    [2, 3, 4]
    


```python
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

del a[1] # 인덱스 번호
print(a)

del a[1:5]
print(a)
```

    [1, 3, 4, 5, 6, 7, 8, 9, 10]
    [1, 7, 8, 9, 10]
    


```python
b = ["a", "b", "c", "d"]
x = b.pop()
print(x)
print(b)
```

    d
    ['a', 'b', 'c']
    

### 그 외 메서드


```python
a = [0, 1, 2, 3]
print(a)

a.clear()
print(a)
```

    [0, 1, 2, 3]
    []
    


```python
a = ["a", "a", "b", "b"]
print(a.index("b")) #  반복 되는 문구가 있을때 index를 쓰면 첫번째 문자의 위치가 출력.
```

    2
    


```python
a = [1, 4, 5, 2, 3]
b = [1, 4, 5, 2, 3]

a.sort()
print("a.sort():", a)

# 내림차순, sort()
b.sort(reverse = True)
print("sort(reverse = True): ", b)
```

    a.sort(): [1, 2, 3, 4, 5]
    None
    sort(reverse = True):  [5, 4, 3, 2, 1]
    


```python
c = [4, 3, 2, 'a']
# c.srot() 숫자와 문자는 정렬 불가.
```

## 튜플
- List와 비슷하다.
- 슬라이싱, 인덱싱 등등
- (vs 리스트) : 튜플은 수정 삭제가 안된다.


```python
tuple1 = (0) # 끝에 콤마(,)를 붙이지 않을 때
tuple2 = (0,) # 끝에 콤마(,)를 붙일때
tuple3 = 0, 1, 2
print(tuple1) # int
print(tuple2) # tuple
print(tuple3) # tuple
```

    0
    (0,)
    (0, 1, 2)
    


```python
a = (0, 1, 2, 3, 'a')
print(type(a))

# del a[4] TypeError: 'tuple' object doesn't support item deletion
# a[1] = "b"
```

    <class 'tuple'>
    

## 튜플 인덱싱 및 슬라이싱 하기


```python
a = (0, 1, 2, 3, "a")
print(a[1])
print(a[3])
print(a[4])
```

    1
    3
    a
    

## 더하기 곱셈 연산자 사용


```python
t1 = (0, 1, 2)
t2 = ('a','b')
print(t1 + t2)
print(t1 * 3)
```

    (0, 1, 2, 'a', 'b')
    (0, 1, 2, 0, 1, 2, 0, 1, 2)
    

## 딕셔너리
- key-value 값으로 나뉨.


```python
dict_01 = {'teacher' : 'evan',
           'class' : 601,
           'student' : 24,
           '학생이름' : ['A','Z']}
# print(dict_01)
print(dict_01['teacher'])
print(dict_01['class'])
print(dict_01['학생이름'])
```

    evan
    601
    ['A', 'Z']
    


```python
print(type(dict_01.keys()))
print(dict_01.keys())
print(list(dict_01.keys()))
```

    <class 'dict_keys'>
    dict_keys(['teacher', 'class', 'student', '학생이름'])
    ['teacher', 'class', 'student', '학생이름']
    


```python
print(type(dict_01.values()))
print(dict_01.values())
print(list(dict_01.values()))
```

    <class 'dict_values'>
    dict_values(['evan', 601, 24, ['A', 'Z']])
    ['evan', 601, 24, ['A', 'Z']]
    


```python
dict_01.items()
```




    dict_items([('teacher', 'evan'), ('class', 601), ('student', 24), ('학생이름', ['A', 'Z'])])




```python
print(dict_01.get("teacher", "값 없음"))
print(dict_01.get("선생님", "값 없음"))
print(dict_01.get("class"))
```

    evan
    값 없음
    601
    

## 조건문 & 반복문


```python
weather = "맑음"
if weather == "비":
  print("우산을 가져간다.")
else:
  print("우산을 가져가지 않는다.")
```

    우산을 가져가지 않는다.
    

- 등급표 만들기
- 60점 이상 합격/불합격
- 숫자는 아무거나 써도 상관없음


```python
score =int(input("점수를 입력해주세요."))

if score >= 60:
  print("합격")
else:
  print("불합격")
```

    점수를 입력해주세요.60
    합격
    


```python
# 90점 이상은 A등급
# 80점 이상은 B등급
# 나머지는 F등급

score = int(input("점수를 입력해주세요"))

if score >= 90:
  print("A등급")
elif score >= 80:
  print("B등급")
else:
  print("F등급")
```

    점수를 입력해주세요56
    F등급
    

## 반복문

- for 문


```python
for i in range(3):
  print(i + 1, "안녕하세요!")
```

    1 안녕하세요!
    2 안녕하세요!
    3 안녕하세요!
    


```python
count = range(50)
print(count)

for n in count:
  print(str(n + 1) + "번째")
  if (n + 1) == 5:
    print("그만합시다!!")
    break
  print("축구 슈팅")
```

    range(0, 50)
    1번째
    축구 슈팅
    2번째
    축구 슈팅
    3번째
    축구 슈팅
    4번째
    축구 슈팅
    5번째
    그만합시다!!
    


```python
a = "hello"

for x in a:
  if x == "l":
    break
  print(x)
```

    h
    e
    


```python
alphabets = ['A', 'B', 'C']
for index, value in enumerate(alphabets):
  print(index, value)
```

    0 A
    1 B
    2 C
    

- while문


```python
n = 0
while n <10:
  n += 1
  print("%d번째 인사입니다." % n)
```

    1번째 인사입니다.
    2번째 인사입니다.
    3번째 인사입니다.
    4번째 인사입니다.
    5번째 인사입니다.
    6번째 인사입니다.
    7번째 인사입니다.
    8번째 인사입니다.
    9번째 인사입니다.
    10번째 인사입니다.
    
