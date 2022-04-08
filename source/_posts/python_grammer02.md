---
title: "파이썬 기초 문법 2"
author: "winters"
date: '2022-03-22'
---

## 기초 문법 리뷰


```python
# 리스트
book_list = ["A","B","C"]
# append, extend, insert, remove, pop, etc

# 튜플
book_tuple = ("A", "B", "c")
# 수정 삭제가 불가능하다

# 딕셔너리
book_dictionary = {"책 제목" : ["A", "B"], "출판년도" :[2011, 2002]}
# keys(), values(), items(), get()
```

## 조건문 & 반복문


```python
if True:
  print("코드 실행")
elif True:
  print("코드 실행")
else:
  print("코드 실행")
```


```python
for i in range(3):
  print(i+1, "안녕하세요")
```

    1 안녕하세요
    2 안녕하세요
    3 안녕하세요
    


```python
book_list = ["프로그래밍 R", "혼자 공부하는 머신러닝"]
for book in book_list:
  print(book)
```

    프로그래밍 R
    혼자 공부하는 머신러닝
    


```python
strings01 = "Hello World"
for char in strings01:
  print(char)
```

    H
    e
    l
    l
    o
     
    W
    o
    r
    l
    d
    


```python
num_tuple = (1, 2, 3, 4)
for num in num_tuple:
  print(num)
```

    1
    2
    3
    4
    


```python
num_dict = {"A" : 1, "B" : 2}
for num in num_dict:
  # print(num) # keys 값이 나옴, value값이 아니라.
  print(num_dict[num])
```

    1
    2
    

## 반복문의 필요성


```python
product_name = ["요구르트", "우유", "과자"]
prices = [1000, 1500, 2000]
quantities = [5, 3, 4]
a = [1, 2, 3]
# name = product_name[0]
# sales = prices[0] * quantities[0]
# print(name + "의 매출액은" + str(sales) + "원이다.")

# name = product_name[1]
# sales = prices[1] * quantities[1]
# print(name + "의 매출액은" + str(sales) + "원이다.")

# 위 코드의 반복문 코드 작성 필요 절감
for i in range(len(product_name)):
  name = product_name[i]
  sales = prices[i] * quantities[i]
  print(name + "의 매출액은" + str(sales) + "원이다.")
```

    요구르트의 매출액은5000원이다.
    우유의 매출액은4500원이다.
    과자의 매출액은8000원이다.
    

## while
- 조건식이 들어간 반복문


```python
count = 1
while count <= 5:
  print("안녕하세요..")
  count += 1
  print(count)

print("5 초과 했군요..")
```

    안녕하세요..
    2
    안녕하세요..
    3
    안녕하세요..
    4
    안녕하세요..
    5
    안녕하세요..
    6
    5 초과 했군요..
    


```python
count = 3
while count > 0:
  print("안녕하세요..")
  count -= 1
  print(count)
```

    안녕하세요..
    2
    안녕하세요..
    1
    안녕하세요..
    0
    

## 리스트 컴프리헨션
- for-loop 반복문을 한줄로 처리


```python
my_list = [[10], [20, 30]]
# print(my_list)

flattened_list = []
for value_list in my_list:
  # print(value_list)
  for value in value_list:
    # print(value)
    flattened_list.append(value)

print(flattened_list)
# 결괏값 : [10, 20 ,30]
```

    [10]
    [20, 30]
    [10, 20, 30]
    


```python
my_list = [[10], [20, 30]]
flattened_list = [value for value_list in my_list for value in value_list]
print(flattened_list)
```

    [10, 20, 30]
    


```python
letters = []
for char in "helloworld":
  letters.append(char)
print(letters)
```

    ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
    


```python
letters2 = [char for char in "helloworld"]
print(letters2)
```

    ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
    

## 사용자 정의 함수 (User-Defined Function)



```python
def 함수명():
  # 코드 실행
  return 값

함수명()
```

- basic.py로 저장할떄, 예시


```python
# /user/local/bin/python
# -*- coding: utf-8 -*-
def temp(content, letter):
  """content안에 있는 문자를 세는 함수입니다.
  
  Args:
    content(str) : 탐색 문자열
    letter(str) : 찾을 문자열

  Returns:
    int
  """

  print("함수 테스트")

  cnt = len([char for char in content if char == letter])
  return cnt

if __name__ == "__main__":
  help(temp)
  docstring = temp.__doc__ # docstring 문서화
  print(docstring)
```

    Help on function temp in module __main__:
    
    temp(content, letter)
        content안에 있는 문자를 세는 함수입니다.
        
        Args:
          content(str) : 탐색 문자열
          letter(str) : 찾을 문자열
        
        Returns:
          int
    
    content안에 있는 문자를 세는 함수입니다.
      
      Args:
        content(str) : 탐색 문자열
        letter(str) : 찾을 문자열
    
      Returns:
        int
      
    


```python
value_list = [1, 2, 3, 4, 5, 6]
print("avg:", sum(value_list) / len(value_list))

# 중간값
midpoint = int(len(value_list) / 2)
# len(value_list) % 2 == 0:
print((value_list[midpoint - 1] + value_list[midpoint]) / 2)
print(value_list[midpoint])

def mean_and_median(value_list):
  """ 숫자 리스트 요소들의 평균과 중간값을 구하는 코드를 작성해라
  Args:
    value_list (iterable of int / float): A list of int numbers
  
  Return:
    tuple(float, float)
  """
  # 평균
  mean = sum(value_list) / len(value_list)
  # 중간값
  midpoint = int(len(value_list) / 2)
  if len(value_list) % 2 == 0:
    median = (value_list[midpoint - 1] + value_list[midpoint]) / 2
  else:
    median = value_list[midpoint]

  return mean, median

if __name__ == "__main__":
  value_lists = [1, 1, 2, 2, 3, 4, 5]
  avg, median = mean_and_median(value_lists)
  print("avg:", avg)
  print("median:", median)
```

    avg: 3.5
    3.5
    4
    avg: 2.5714285714285716
    median: 2
    

- 데코레이터, 변수명 immutable or mutable
context manager

## 함수 클로저 사용하기

- global 함수 (전역 변수 변경)


```python
x = 10
def foo():
  x = 20
  print(x)

print(x)
foo()
```

    10
    20
    


```python
x = 10
def foo():
  global x # 전역 변수를 설정하겠다
  x = 20
  print(x)

print(x)
foo()
```

    10
    20


