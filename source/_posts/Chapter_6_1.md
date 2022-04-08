---
title: "마켓과 머신러닝(Chapter_6_1)"
author: "winters"
date: '2022-03-31'
---

# 비지도 학습
- vs 지도학습
  + 종속변수 = 타깃
- 비지도학습은 종속변수 및 타겟이 없음
- 분류
  + 다중분류
  + 전체조건이 (다양한 유형) 데이터가 많아야함
  + 딥러닝과 연관 (자연어처리, 이미지)

# 데이터 불러오기


```python
!wget https://bit.ly/fruits_300_data -O fruits_300.npy
```

    --2022-03-31 01:37:42--  https://bit.ly/fruits_300_data
    Resolving bit.ly (bit.ly)... 67.199.248.10, 67.199.248.11
    Connecting to bit.ly (bit.ly)|67.199.248.10|:443... connected.
    HTTP request sent, awaiting response... 301 Moved Permanently
    Location: https://github.com/rickiepark/hg-mldl/raw/master/fruits_300.npy [following]
    --2022-03-31 01:37:42--  https://github.com/rickiepark/hg-mldl/raw/master/fruits_300.npy
    Resolving github.com (github.com)... 140.82.114.3
    Connecting to github.com (github.com)|140.82.114.3|:443... connected.
    HTTP request sent, awaiting response... 302 Found
    Location: https://raw.githubusercontent.com/rickiepark/hg-mldl/master/fruits_300.npy [following]
    --2022-03-31 01:37:42--  https://raw.githubusercontent.com/rickiepark/hg-mldl/master/fruits_300.npy
    Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.110.133, 185.199.111.133, ...
    Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 3000128 (2.9M) [application/octet-stream]
    Saving to: ‘fruits_300.npy’
    
    fruits_300.npy      100%[===================>]   2.86M  --.-KB/s    in 0.07s   
    
    2022-03-31 01:37:43 (41.4 MB/s) - ‘fruits_300.npy’ saved [3000128/3000128]
    
    


```python
import numpy as np
import matplotlib.pyplot as plt

fruits = np.load('/content/fruits_300.npy')
print(fruits.shape)
print(fruits.ndim)
```

    (300, 100, 100)
    3
    

- 첫번째 차원(300) = 샘플의 개수
- 두번째 차원(100) = 이미지 높이
- 세번째 차원(100) = 이미지 너비
- 이미지 크기 100 x 100


```python
fruits[0, :, 0]
```




    array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
           1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 6, 1, 2, 3, 1, 2, 3,
           1, 1, 1, 2, 2, 2, 5, 2, 2, 5, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
           1, 2, 2, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], dtype=uint8)



- 이미지 시각화
  + 흑백 사진을 담고 있다.
  + 0 ~ 255까지의 정숫값을 가진다


```python
plt.imshow(fruits[0], cmap = 'gray')
plt.show()
```


    
![png](images/Chapter_6_1/output_7_0.png)
    



```python
plt.imshow(fruits[0], cmap = 'gray_r')
plt.show()
```


    
![png](images/Chapter_6_1/output_8_0.png)
    


- 여러 이미지 시각화


```python
fig, axs = plt.subplots(1, 2)
axs[0].imshow(fruits[100], cmap = 'gray_r')
axs[1].imshow(fruits[200], cmap = 'gray_r')

plt.show()
```


    
![png](images/Chapter_6_1/output_10_0.png)
    


# 픽셀값 분석
- 배열을 계산할 때 1차원 배열로 펼쳐서 계산하면 편리하기 때문에 100 x 100 이미지를 펼쳐서 10,000인 1차원 배열로 만든다.


```python
apple = fruits[0:100].reshape(-1, 100 * 100)
pineapple = fruits[100:200].reshape(-1, 100 * 100)
banana = fruits[200:300].reshape(-1, 100*100)

print(apple.shape)
print(pineapple.shape)
print(banana.shape)
```

    (100, 10000)
    (100, 10000)
    (100, 10000)
    

- 100 x 100 이미지를 펼친 10,000인 1차원 배열로 만들었으니 열을 사용해 샘플의 픽셀 평균값을 계산
- axis = 0 vs axis = 1 차이 확인(p.293)


```python
# axis = 1 열
print(apple.mean(axis = 1))
```

    [ 88.3346  97.9249  87.3709  98.3703  92.8705  82.6439  94.4244  95.5999
      90.681   81.6226  87.0578  95.0745  93.8416  87.017   97.5078  87.2019
      88.9827 100.9158  92.7823 100.9184 104.9854  88.674   99.5643  97.2495
      94.1179  92.1935  95.1671  93.3322 102.8967  94.6695  90.5285  89.0744
      97.7641  97.2938 100.7564  90.5236 100.2542  85.8452  96.4615  97.1492
      90.711  102.3193  87.1629  89.8751  86.7327  86.3991  95.2865  89.1709
      96.8163  91.6604  96.1065  99.6829  94.9718  87.4812  89.2596  89.5268
      93.799   97.3983  87.151   97.825  103.22    94.4239  83.6657  83.5159
     102.8453  87.0379  91.2742 100.4848  93.8388  90.8568  97.4616  97.5022
      82.446   87.1789  96.9206  90.3135  90.565   97.6538  98.0919  93.6252
      87.3867  84.7073  89.1135  86.7646  88.7301  86.643   96.7323  97.2604
      81.9424  87.1687  97.2066  83.4712  95.9781  91.8096  98.4086 100.7823
     101.556  100.7027  91.6098  88.8976]
    

- 각 과일에 대한 히스토그램 작성


```python
plt.hist(np.mean(apple, axis = 1), alpha = 0.8) # alpha 는 그래프의 색상 농도
plt.hist(np.mean(pineapple, axis = 1), alpha = 0.8)
plt.hist(np.mean(banana, axis = 1), alpha = 0.8)
plt.legend(['apple', 'pineapple', 'banana']) # legend() 과일 분류 상자
plt.show()
```


    
![png](images/Chapter_6_1/output_16_0.png)
    



```python
fig, axs = plt.subplots(1, 3, figsize=(20, 5))
axs[0].bar(range(10000), np.mean(apple, axis = 0))
axs[1].bar(range(10000), np.mean(pineapple, axis = 0))
axs[2].bar(range(10000), np.mean(banana, axis = 0))
plt.show()
```


    
![png](images/Chapter_6_1/output_17_0.png)
    



```python
apple_mean = np.mean(apple, axis = 0).reshape(100, 100)
pineapple_mean = np.mean(pineapple, axis = 0).reshape(100, 100)
banana_mean = np.mean(banana, axis = 0).reshape(100, 100)
fig, axs = plt.subplots(1, 3, figsize=(20,5))
axs[0].imshow(apple_mean, cmap = 'gray_r')
axs[1].imshow(pineapple_mean, cmap = 'gray_r')
axs[2].imshow(banana_mean, cmap = 'gray_r')
plt.show()
```


    
![png](images/Chapter_6_1/output_18_0.png)
    


# 평균값과 가까운 사진 고르기


```python
abs_diff = np.abs(fruits - apple_mean)
abs_mean = np.mean(abs_diff, axis =(1,2))
print(abs_mean.shape)
```

    (300,)
    


```python
apple_index = np.argsort(abs_mean)[:100]
fig, axs = plt.subplots(10, 10, figsize = (10, 10))
for i in range(10):
  for j in range(10):
    axs[i, j].imshow(fruits[apple_index[i*10 + j]], cmap = 'gray_r')
    axs[i, j].axis('off')
plt.show()
```


    
![png](images/Chapter_6_1/output_21_0.png)
    

