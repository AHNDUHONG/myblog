---
title: "파이썬 넘파이 1"
author: "winters"
date: '2022-03-23'
---

- 파이썬 라이브러리 설치 방법 (vs R)


```python
# R install.pakages("패키지명")
# 파이썬 라이브러리 설치 코드에서 실행 (x)
# 터미널에서 설치
# 방법 1. conda 설치
# --> 아나콘다 설치 후, conda 설치 (데이터 과학)
# 방법 2. pip 설치 (개발 + 데이터과학 + 그외)
# --> 아나콘다 설치 안함 / 파이썬만 설치

# git bash 열고, pip install numpy
# pip install numpy
```

### NumPy 라이브 불러오기


```python
import numpy
print(numpy.__version__)
```

    1.21.5
    


```python
import numpy as np
print(np.__version__)
```

    1.21.5
    

## 배열로 변환
- 1부터 10까지의 리스트를 만든다.
- NumPy 배열로 변환해서 저장한다.


```python
temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
arr = np.array(temp)
print(arr)
print(temp)
```

    [ 1  2  3  4  5  6  7  8  9 10]
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    


```python
print(type(temp))
print(type(arr))
```

    <class 'list'>
    <class 'numpy.ndarray'>
    

- arr 배열 숫자 5 출력


```python
arr[4:8]
```




    array([5, 6, 7, 8])



- NumPy를 사용하여 기초 통계 함수를 사용한다.


```python
np.mean(arr)
np.sum(arr)
np.median(arr)
np.std(arr)
```




    2.8722813232690143



# 사칙연산


```python
math_scores = [90, 80, 88]
english_scores = [80, 70, 90]

total_scores = math_scores + english_scores
total_scores
```




    [90, 80, 88, 80, 70, 90]




```python
math_scores = [90, 80, 88]
english_scores = [80, 70, 90]

math_arr = np.array(math_scores)
english_arr = np.array(english_scores)

total_scores = math_arr + english_arr
total_scores
```




    array([170, 150, 178])




```python
np.min(total_scores)
```




    150




```python
np.max(total_scores)
```




    178




```python
math_scores = [2, 3, 4]
english_scores = [1, 2, 3]

math_arr = np.array(math_scores)
english_arr = np.array(english_scores)

# 사칙연산
print("덧셈:", np.add(math_arr, english_arr))
print("뺄셈:", np.subtract(math_arr, english_arr))
print("곱셈:", np.multiply(math_arr, english_arr))
print("나눗셈:", np.divide(math_arr, english_arr))
print("거듭제곱:", np.power(math_arr, english_arr))
```

    덧셈: [3 5 7]
    뺄셈: [1 1 1]
    곱셈: [ 2  6 12]
    나눗셈: [2.         1.5        1.33333333]
    거듭제곱: [ 2  9 64]
    

## 배열의 생성
- 0차원부터 3차원까지 생성하는 방법


```python
temp_arr = np.array(20)
print(temp_arr)
print(type(temp_arr))
print(temp_arr.shape)
```

    20
    <class 'numpy.ndarray'>
    ()
    


```python
# 1차원 배열
temp_arr = np.array([1, 2, 3])
print(temp_arr)
print(type(temp_arr))
print(temp_arr.shape)
print(temp_arr.ndim) # 몇 차원인지 알아보는 법
```

    [1 2 3]
    <class 'numpy.ndarray'>
    (3,)
    1
    


```python
# 2차원 배열
temp_arr = np.array([[1, 2, 3], [4, 5, 6]])
print(temp_arr)
print(type(temp_arr))
print(temp_arr.shape) # 2 * 3 배열이다
print(temp_arr.ndim)
```

    [[1 2 3]
     [4 5 6]]
    <class 'numpy.ndarray'>
    (2, 3)
    2
    


```python
# 3차원 배열
temp_arr = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]])
print(temp_arr)
print(type(temp_arr))
print(temp_arr.shape)
print(temp_arr.ndim)
```

    [[[1 2 3]
      [4 5 6]]
    
     [[1 2 3]
      [4 5 6]]]
    <class 'numpy.ndarray'>
    (2, 2, 3)
    3
    


```python
temp_arr = np.array([1, 2, 3, 4], ndmin = 2) # ndmin으로 인해 2차원 배열로 바뀜
print(temp_arr)
print(type(temp_arr))
print(temp_arr.shape)
print(temp_arr.ndim)
```

    [[1 2 3 4]]
    <class 'numpy.ndarray'>
    (1, 4)
    2
    

## 소수점 정렬


```python
temp_arr = np.trunc([-1.23, 1.23])
temp_arr # 소수점 아래 자리가 절삭됨.
```




    array([-1.,  1.])




```python
temp_arr = np.fix([-1.23, 1.23])
temp_arr
```




    array([-1.,  1.])




```python
temp_arr = np.around([-1.23789, 1.23789], 4)
temp_arr
```




    array([-1.2379,  1.2379])




```python
temp_arr = np.round([-1.23789, 1.23789], 4)
temp_arr
```




    array([-1.2379,  1.2379])




```python
temp_arr = np.floor([-1.23789, 1.23789]) # 내림
temp_arr
```




    array([-2.,  1.])




```python
temp_arr = np.ceil([-1.23789, 1.23789]) # 올림
temp_arr
```




    array([-1.,  2.])



* shape는 axis 축을 설정함

## 배열을 생성하는 다양한 방법들


```python
temp_arr = np.arange(5)
temp_arr
```




    array([0, 1, 2, 3, 4])




```python
temp_arr = np.arange(1, 11, 3)
temp_arr
```




    array([ 1,  4,  7, 10])




```python
zero_arr = np.zeros((2, 3))
print(zero_arr)
print(type(zero_arr))
print(zero_arr.shape)
print(zero_arr.ndim)
print(zero_arr.dtype) # float64 -> 64는 bit
```

    [[0. 0. 0.]
     [0. 0. 0.]]
    <class 'numpy.ndarray'>
    (2, 3)
    2
    float64
    


```python
temp_arr = np.ones((4, 5), dtype = "int32") # 데이터 타입도 인위적으로 수정 가능
print(temp_arr)
print(type(temp_arr))
print(temp_arr.shape)
print(temp_arr.ndim)
print(temp_arr.dtype)
```

    [[1 1 1 1 1]
     [1 1 1 1 1]
     [1 1 1 1 1]
     [1 1 1 1 1]]
    <class 'numpy.ndarray'>
    (4, 5)
    2
    int32
    


```python
temp_arr = np.ones((2, 6), dtype = "int32")
temp_res_arr = temp_arr.reshape(2, 2, 3) # (5, 3)을 했을때 cannot reshape array of size 12 into shape (5,3)
print(temp_res_arr)                   # 사이즈를 12로 바꾸면 되서 4, 3 또는 3, 4 등 바꿔주면 됨.
print(type(temp_res_arr))
print(temp_res_arr.shape)
print(temp_res_arr.ndim)
print(temp_res_arr.dtype)
```

    [[[1 1 1]
      [1 1 1]]
    
     [[1 1 1]
      [1 1 1]]]
    <class 'numpy.ndarray'>
    (2, 2, 3)
    3
    int32
    


```python
temp_arr = np.ones((12, 12), dtype = "int32")
temp_res_arr = temp_arr.reshape(5, -1) # np.ones(12, 12) -> 12*12 = 144 약수가 아니면 error
print(temp_res_arr) 
print(type(temp_res_arr))
print(temp_res_arr.shape)
print(temp_res_arr.ndim)
print(temp_res_arr.dtype)
```


    ---------------------------------------------------------------------------

    ValueError                                Traceback (most recent call last)

    <ipython-input-60-dfc75cfbf69a> in <module>()
          1 temp_arr = np.ones((12, 12), dtype = "int32")
    ----> 2 temp_res_arr = temp_arr.reshape(5, -1)
          3 print(temp_res_arr)
          4 print(type(temp_res_arr))
          5 print(temp_res_arr.shape)
    

    ValueError: cannot reshape array of size 144 into shape (5,newaxis)


## numpy 조건식

- np.where()


```python
temp_arr = np.arange(10)
temp_arr
```




    array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])




```python
# 5보다 작은 값은 원래값으로 반환
# 5보다 큰 값은 원래 값 * 10
np.where(temp_arr < 5, temp_arr, temp_arr * 10)
```




    array([ 0,  1,  2,  3,  4, 50, 60, 70, 80, 90])




```python
# 0 - 100 까지의 배열을 만들고, 50보다 작은 값은 곱하기 10, 나머지는 그냥 원래 값으로 반환
# np.where 은 조건식이 하나만 필요할 떄 사용
temp_arr = np.arange(101)
# temp_arr
np.where(temp_arr < 50, temp_arr * 10, temp_arr)
```




    array([  0,  10,  20,  30,  40,  50,  60,  70,  80,  90, 100, 110, 120,
           130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250,
           260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380,
           390, 400, 410, 420, 430, 440, 450, 460, 470, 480, 490,  50,  51,
            52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,  64,
            65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,
            78,  79,  80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,
            91,  92,  93,  94,  95,  96,  97,  98,  99, 100])



- np.select()


```python
temp_arr = np.arange(10)
temp_arr

# 5보다 큰 값은 곱하기 2, 2보다 작은 값은 더하기 100
```




    array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])




```python
condlist = [temp_arr > 5, temp_arr < 2]
choicelist = [temp_arr * 2, temp_arr + 100]
np.select(condlist, choicelist, default = temp_arr)
```




    array([100, 101,   2,   3,   4,   5,  12,  14,  16,  18])


