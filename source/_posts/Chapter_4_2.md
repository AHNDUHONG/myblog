---
title: "마켓과 머신러닝(Chapter_4_2)"
author: "winters"
date: '2022-03-29'
categories: 'Education'
tags: 'edu'
---

# 확률적 경사 하강법
- 1차 가장 큰 차이(기존 ML모형)
  + 샘플링 방식이 달라짐
  + 샘플링을 더 세분화함

- 2차 가장 큰 차이
  + 오차를 보정(기울기)

- 오차 = 손실 = coast
  + 미분을 하여 오차가 가장 적을때까지 내려감.

- 경사 하강법이 쓰인 여러 알고리즘
  + (이미지, 텍스트) 딥러닝 기초 알고리즘
  + 트리 알고리즘 + 경사 하강법 융합 = 부스트 계열
  + 대표 알고리즘 : **LightGBM**, **Xgboost**, Catboost

# SGDClassifier
- 확률적 경사하강법 분류기


```python
import pandas as pd 
fish = pd.read_csv("https://bit.ly/fish_csv_data")
fish.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 159 entries, 0 to 158
    Data columns (total 6 columns):
     #   Column    Non-Null Count  Dtype  
    ---  ------    --------------  -----  
     0   Species   159 non-null    object 
     1   Weight    159 non-null    float64
     2   Length    159 non-null    float64
     3   Diagonal  159 non-null    float64
     4   Height    159 non-null    float64
     5   Width     159 non-null    float64
    dtypes: float64(5), object(1)
    memory usage: 7.6+ KB
    

- 배열로 변환하는 코드
  + 독립변수 = fish_input
  + 종속변수 = fish_target


```python
fish_input = fish[['Weight', 'Length', 'Diagonal', 'Height', 'Width']]
fish_target = fish['Species'].to_numpy()
```

- 훈련 세트와 테스트 세트로 분리


```python
from sklearn.model_selection import train_test_split
train_input, test_input, train_target, test_target = train_test_split(fish_input, fish_target, random_state = 42)

train_input.shape, test_input.shape, train_target.shape, test_target.shape
```




    ((119, 5), (40, 5), (119,), (40,))



- 표준화 처리
  + 다시 한번 강조하지만 꼭 훈련 세트에서 학습한 통계값으로 테스트 세트도 변환한다.
  + 키워드 : Data Leakage 방지
  + 데이터 분석 희망자 필수 공부!


```python
from sklearn.preprocessing import StandardScaler
ss = StandardScaler()
ss.fit(train_input)

# ss 훈련 데이터만 활용해서 학습(?)이 끝난 상태
# 표준화 처리를 훈련 데이터와 테스트 데이터에 동시 적용
train_scaled = ss.transform(train_input)
test_scaled = ss.transform(test_input)
```

# 모델 학습
- 2개의 매개 변수 지정
- loss = "log" = 로지스틱 손실 함수로 지정
- max_iter = 에포크 횟수 지정
  + 에포크란(epoch)_01 : 훈련 데이터셋에 포함된 모든 데이터들이 한 번씩 모델을 통과한 횟수로, 모든 학습 데이터셋을 학습하는 횟수
  + 에포크란_02 : 1 epoch는 전체 학습 데이터셋이 한 신경망에 적용되어 순전파와 역전파를 통해 신경망을 한 번 통과했다는 의미가 된다, 즉 epoch가 10회라면, 학습 데이터 셋 A를 10회 모델에 학습시켰다는 것
  + 에포크란_03 : epoch를 높일수록, 다양한 무작위 가중치로 학습을 해보므로, 적합한 파라미터를 찾을 확률이 올라간다.(즉, 손실 값이 내려가게 된다.) **하지만 지나치게 epoch를 높이게 되면, 그 학습 데이터셋에 과적합되어 다른데이터에 대해선 제대로 된 예측을 하지 못할 수 있다.**


```python
from sklearn.linear_model import SGDClassifier

# 매개변수 지정
# 하이퍼파라미터 설정
## 매개변수 값을 dictionary 형태로 추가하는 코드 작성 가능 
## 강사는 입문자들에게는 비추천
sc = SGDClassifier(loss = "log", max_iter = 40, random_state = 42)

# 모형 학습
sc.fit(train_scaled, train_target)

# 스코어 확인 (정확도)
print(sc.score(train_scaled, train_target))
print(sc.score(test_scaled, test_target)) # 샘플링의 차이로 값이 일정하지 않고 다를 수 있다.
```

    0.8571428571428571
    0.8
    

- 적절한 에포크 숫자를 찾자.


```python
import numpy as np
sc = SGDClassifier(loss = "log", max_iter = 100, tol = None, random_state = 42)
train_score = []
test_score = []
classes = np.unique(train_target)
for _ in range(0, 300):
  sc.partial_fit(train_scaled, train_target, classes = classes)
  train_score.append(sc.score(train_scaled, train_target))
  test_score.append(sc.score(test_scaled, test_target))

# 정확도
print(train_score[:5])
print(test_score[:5])
```

    [0.5294117647058824, 0.6218487394957983, 0.6386554621848739, 0.7310924369747899, 0.7226890756302521]
    [0.65, 0.55, 0.575, 0.7, 0.7]
    

- 모형 시각화


```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot(train_score)
ax.plot(test_score)
ax.set_xlabel("Epoch")
ax.set_ylabel("Accuracy")
plt.show()
# 파란색 훈련, 노란색 테스트
# 훈련데이터가 안정화되고 테스트데이터도 안정화되면서 가까운 곳은 epoch가 100일때의 지점이라고 알 수 있음.
```


    
![png](/images/Chapter_4_2/output_16_0.png)
    

