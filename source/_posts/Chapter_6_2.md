---
title: "마켓과 머신러닝(Chapter_6_2)"
author: "winters"
date: '2022-03-31'
---


# K-평균
- 각각의 픽셀값(3차원 -> 1차원 배열) 평균 구함
  + 픽셀의 평균값을 활용해서 사과, 파앤애플, 바나나의 근사한 이미지를 추출하는 것

- 어떻게 평균값을 구할 수 있을까?
  + K-평균 알고리즘 (K-Means) 알고리즘
  + 평균값 = Cluster Center = Centroid


```python
!wget https://bit.ly/fruits_300_data -O fruits_300.npy
```

    --2022-03-31 02:16:44--  https://bit.ly/fruits_300_data
    Resolving bit.ly (bit.ly)... 67.199.248.10, 67.199.248.11
    Connecting to bit.ly (bit.ly)|67.199.248.10|:443... connected.
    HTTP request sent, awaiting response... 301 Moved Permanently
    Location: https://github.com/rickiepark/hg-mldl/raw/master/fruits_300.npy [following]
    --2022-03-31 02:16:44--  https://github.com/rickiepark/hg-mldl/raw/master/fruits_300.npy
    Resolving github.com (github.com)... 192.30.255.113
    Connecting to github.com (github.com)|192.30.255.113|:443... connected.
    HTTP request sent, awaiting response... 302 Found
    Location: https://raw.githubusercontent.com/rickiepark/hg-mldl/master/fruits_300.npy [following]
    --2022-03-31 02:16:44--  https://raw.githubusercontent.com/rickiepark/hg-mldl/master/fruits_300.npy
    Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.110.133, 185.199.111.133, 185.199.108.133, ...
    Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.110.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 3000128 (2.9M) [application/octet-stream]
    Saving to: ‘fruits_300.npy’
    
    fruits_300.npy      100%[===================>]   2.86M  --.-KB/s    in 0.05s   
    
    2022-03-31 02:16:44 (62.6 MB/s) - ‘fruits_300.npy’ saved [3000128/3000128]
    
    


```python
import numpy as np
fruits = np.load('/content/fruits_300.npy')
print(fruits.shape)
print(fruits.ndim)
```

    (300, 100, 100)
    3
    

- 3차원(샘플개수, 너비, 높이)
- 2차원(샘플개수, 너비 x 높이)


```python
fruits_2d = fruits.reshape(-1, 100 * 100)
fruits_2d.shape
```




    (300, 10000)



- K-평균 알고리즘 활용


```python
from sklearn.cluster import KMeans
km = KMeans(n_clusters = 3, random_state = 42)
km.fit(fruits_2d)
```




    KMeans(n_clusters=3, random_state=42)



- 모형 학습 후, labels


```python
print(km.labels_)
```

    [2 2 2 2 2 0 2 2 2 2 2 2 2 2 2 2 2 2 0 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
     2 2 2 2 2 0 2 0 2 2 2 2 2 2 2 0 2 2 2 2 2 2 2 2 2 0 0 2 2 2 2 2 2 2 2 0 2
     2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 0 2 2 2 2 2 2 2 2 0 0 0 0 0 0 0 0 0 0 0
     0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
     0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
     0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
     1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
     1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
     1 1 1 1]
    

- 직접 샘플의 개수 확인


```python
print(np.unique(km.labels_, return_counts = True))
```

    (array([0, 1, 2], dtype=int32), array([111,  98,  91]))
    

- 그래프를 직접 그려본다


```python
import matplotlib.pyplot as plt

def draw_fruits(arr, ratio=1):
    n = len(arr)    # n은 샘플 개수입니다
    # 한 줄에 10개씩 이미지를 그립니다. 샘플 개수를 10으로 나누어 전체 행 개수를 계산합니다. 
    rows = int(np.ceil(n/10))
    # 행이 1개 이면 열 개수는 샘플 개수입니다. 그렇지 않으면 10개입니다.
    cols = n if rows < 2 else 10
    fig, axs = plt.subplots(rows, cols, 
                            figsize=(cols*ratio, rows*ratio), squeeze=False)
    for i in range(rows):
        for j in range(cols):
            if i*10 + j < n:    # n 개까지만 그립니다.
                axs[i, j].imshow(arr[i*10 + j], cmap='gray_r')
            axs[i, j].axis('off')
    plt.show()
```


```python
draw_fruits(fruits[km.labels_ == 0])
```


    
![png](images/Chapter_6_2/output_14_0.png)
    


# 클러스터 중심


```python
draw_fruits(km.cluster_centers_.reshape(-1, 100, 100), ratio = 3) # fruits_2d 샘플의 클러스터 중심이기 때문에 이미지로 출력하려면 100 X 100 크기로 변환
```


    
![png](images/Chapter_6_2/output_16_0.png)
    



```python
print(km.transform(fruits_2d[100:101])) # transform 메서드는 훈련데이터 샘플에서 클러스터 중심까지 거리로 변환해준다.
```

    [[3393.8136117  8837.37750892 5267.70439881]]
    


```python
print(km.predict(fruits_2d[100:101]))
```

    [0]
    


```python
draw_fruits(fruits[100:101])
```


    
![png](images/Chapter_6_2/output_19_0.png)
    


# 최적의 K-평균 찾기
- inertia 
  + 목적함수 값이 최소화될 때까지 군집의 중심위치와 각 데이터가 소속될 군집를 반복해서 찾는다. 이 값을 관성(inertia)이라고 함
  + 클러스터에 속한 샘플이 얼마나 가깝게 모여있는지를 나타내는 값
- 엘보우 방법 
  + 클러스터의 개수가 늘어나면 클러스터 개개의 크기는 줄어들기 때문에 이너셔도 같이 줄어듬, 그렇기 때문에 클러스터 개수를 늘려가면서 이너셔의 변화를 관찰하여 최적의 클러스터 개수를 찾는다.

```python
inertia = []
for k in range(2, 7):
  km = KMeans(n_clusters = k, random_state = 42)
  km.fit(fruits_2d)
  inertia.append(km.inertia_)
plt.plot(range(2, 7), inertia)
plt.show
```




    <function matplotlib.pyplot.show>




    
![png](images/Chapter_6_2/output_21_1.png)
    

