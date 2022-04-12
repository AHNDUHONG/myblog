---
title: "visualization 튜토리얼 1"
author: "winters"
date: '2022-03-25'
categories: 'Education'
tags: 'edu'
---

# 라이브 러리 불러오기


```python
import matplotlib
import seaborn as sns
print(matplotlib.__version__)
print(sns.__version__)
```

    3.2.2
    0.11.2
    

# 시각화 그려보기


```python
import matplotlib.pyplot as plt

dates = [
    '2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05',
    '2021-01-06', '2021-01-07', '2021-01-08', '2021-01-09', '2021-01-10'
]
min_temperature = [20.7, 17.9, 18.8, 14.6, 15.8, 15.8, 15.8, 17.4, 21.8, 20.0]
max_temperature = [34.7, 28.9, 31.8, 25.6, 28.8, 21.8, 22.8, 28.4, 30.8, 32.0]

# 앞으로 여러분들이 아래와 같이 코드를 작성해주시면 됩니다.
flg, ax = plt.subplots(nrows = 1, ncols = 1, figsize = (10, 6)) # 시각화 기초 해심



ax.plot(dates, min_temperature, label = "Min Temp.")
ax.plot(dates, max_temperature, label = "Max Temp.")
ax.legend()
plt.show()
```


![png](/images/visulization_tutorial_01/output_4_0.png)
    



```python
!pip install yfinance --upgrade --no-cache-dir
```

    Collecting yfinance
      Downloading yfinance-0.1.70-py2.py3-none-any.whl (26 kB)
    Requirement already satisfied: numpy>=1.15 in /usr/local/lib/python3.7/dist-packages (from yfinance) (1.21.5)
    Collecting lxml>=4.5.1
      Downloading lxml-4.8.0-cp37-cp37m-manylinux_2_17_x86_64.manylinux2014_x86_64.manylinux_2_24_x86_64.whl (6.4 MB)
    [K     |████████████████████████████████| 6.4 MB 16.4 MB/s 
    [?25hCollecting requests>=2.26
      Downloading requests-2.27.1-py2.py3-none-any.whl (63 kB)
    [K     |████████████████████████████████| 63 kB 5.9 MB/s 
    [?25hRequirement already satisfied: pandas>=0.24.0 in /usr/local/lib/python3.7/dist-packages (from yfinance) (1.3.5)
    Requirement already satisfied: multitasking>=0.0.7 in /usr/local/lib/python3.7/dist-packages (from yfinance) (0.0.10)
    Requirement already satisfied: pytz>=2017.3 in /usr/local/lib/python3.7/dist-packages (from pandas>=0.24.0->yfinance) (2018.9)
    Requirement already satisfied: python-dateutil>=2.7.3 in /usr/local/lib/python3.7/dist-packages (from pandas>=0.24.0->yfinance) (2.8.2)
    Requirement already satisfied: six>=1.5 in /usr/local/lib/python3.7/dist-packages (from python-dateutil>=2.7.3->pandas>=0.24.0->yfinance) (1.15.0)
    Requirement already satisfied: charset-normalizer~=2.0.0 in /usr/local/lib/python3.7/dist-packages (from requests>=2.26->yfinance) (2.0.12)
    Requirement already satisfied: urllib3<1.27,>=1.21.1 in /usr/local/lib/python3.7/dist-packages (from requests>=2.26->yfinance) (1.24.3)
    Requirement already satisfied: certifi>=2017.4.17 in /usr/local/lib/python3.7/dist-packages (from requests>=2.26->yfinance) (2021.10.8)
    Requirement already satisfied: idna<4,>=2.5 in /usr/local/lib/python3.7/dist-packages (from requests>=2.26->yfinance) (2.10)
    Installing collected packages: requests, lxml, yfinance
      Attempting uninstall: requests
        Found existing installation: requests 2.23.0
        Uninstalling requests-2.23.0:
          Successfully uninstalled requests-2.23.0
      Attempting uninstall: lxml
        Found existing installation: lxml 4.2.6
        Uninstalling lxml-4.2.6:
          Successfully uninstalled lxml-4.2.6
    [31mERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
    google-colab 1.0.0 requires requests~=2.23.0, but you have requests 2.27.1 which is incompatible.
    datascience 0.10.6 requires folium==0.2.1, but you have folium 0.8.3 which is incompatible.[0m
    Successfully installed lxml-4.8.0 requests-2.27.1 yfinance-0.1.70
    


```python
import yfinance as yf
data = yf.download("AAPL", start = "2019-08-01", end = "2022-03-23")
ts = data['Open']
print(ts.head())
print(type(ts))
```

    [*********************100%***********************]  1 of 1 completed
    Date
    2019-08-01    53.474998
    2019-08-02    51.382500
    2019-08-05    49.497501
    2019-08-06    49.077499
    2019-08-07    48.852501
    Name: Open, dtype: float64
    <class 'pandas.core.series.Series'>
    

## pyplot 형태


```python
import matplotlib.pyplot as plt
plt.plot(ts)
plt.title("Stock Market of AAPL") # 구글 코랩에서 한글 타이틀은 인식을 못하여 나중에 세팅해야함
plt.xlabel("Date")
plt.ylabel("Open Price")
plt.show()
```


    
![png](/images/visulization_tutorial_01/output_8_0.png)
    



```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots() #fig 는 겉 테두리
ax.plot(ts)
ax.set_title("Stock Market of AAPL")
ax.set_xlabel("Date")
ax.set_ylabel("Open Price")
plt.show()
```


    
![png](/images/visulization_tutorial_01/output_9_0.png)
    


## 막대 그래프


```python
calendar.month_name[1:13]
```




    ['January',
     'February',
     'March',
     'April',
     'May',
     'June',
     'July',
     'August',
     'September',
     'October',
     'November',
     'December']




```python
import matplotlib.pyplot as plt
import numpy as np
import calendar # 날짜를 관장하는 라이브러리

month_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
sold_list = [300, 400, 550, 900, 600, 960, 900, 910, 800, 700, 550, 450]

fig, ax = plt.subplots(figsize = (10, 6))
barplots = ax.bar(month_list, sold_list)

print("barplots :", barplots)

for plot in barplots:
  print(plot)
  # print(plot.get_height())
  # print(plot.get_x())
  # print(plot.get_y())
  # print(plot.get_width())
  height = plot.get_height()
  ax.text(plot.get_x() + plot.get_width()/2., height, height, ha = 'center', va = 'bottom')

plt.xticks(month_list, calendar.month_name[1:13], rotation = 90)
plt.show()
```

    barplots : <BarContainer object of 12 artists>
    Rectangle(xy=(0.6, 0), width=0.8, height=300, angle=0)
    Rectangle(xy=(1.6, 0), width=0.8, height=400, angle=0)
    Rectangle(xy=(2.6, 0), width=0.8, height=550, angle=0)
    Rectangle(xy=(3.6, 0), width=0.8, height=900, angle=0)
    Rectangle(xy=(4.6, 0), width=0.8, height=600, angle=0)
    Rectangle(xy=(5.6, 0), width=0.8, height=960, angle=0)
    Rectangle(xy=(6.6, 0), width=0.8, height=900, angle=0)
    Rectangle(xy=(7.6, 0), width=0.8, height=910, angle=0)
    Rectangle(xy=(8.6, 0), width=0.8, height=800, angle=0)
    Rectangle(xy=(9.6, 0), width=0.8, height=700, angle=0)
    Rectangle(xy=(10.6, 0), width=0.8, height=550, angle=0)
    Rectangle(xy=(11.6, 0), width=0.8, height=450, angle=0)
    


    
![png](/images/visulization_tutorial_01/output_12_1.png)
    



```python
import seaborn as sns

tips = sns.load_dataset("tips")
print(tips.info())
x = tips['total_bill']
y = tips['tip']

# 산점도
fig, ax = plt.subplots(figsize = (10,6))
ax.scatter(x, y)
ax.set_xlabel('Total Bill')
ax.set_ylabel('Tip')
plt.show()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 244 entries, 0 to 243
    Data columns (total 7 columns):
     #   Column      Non-Null Count  Dtype   
    ---  ------      --------------  -----   
     0   total_bill  244 non-null    float64 
     1   tip         244 non-null    float64 
     2   sex         244 non-null    category
     3   smoker      244 non-null    category
     4   day         244 non-null    category
     5   time        244 non-null    category
     6   size        244 non-null    int64   
    dtypes: category(4), float64(2), int64(1)
    memory usage: 7.4 KB
    None
    


    
![png](/images/visulization_tutorial_01/output_13_1.png)
    



```python
label, data = tips.groupby('sex')
# print(label)
# print(data)

tips['sex_color'] = tips['sex'].map({'Male': '#2521F6', 'Female': '#EB4036'})
# print(tips.head())

fig, ax = plt.subplots(figsize = (10, 6))
for label, data in tips.groupby('sex'):
  ax.scatter(data['total_bill'], data['tip'], label = label, color = data['sex_color'], alpha = 0.5)
  ax.set_xlabel('Total Bill')
  ax.set_ylabel('Tip')

ax.legend() # 범례
plt.show()
```


    
![png](/images/visulization_tutorial_01/output_14_0.png)
    


## Seaborn


```python
from IPython.core.pylabtools import figsize
import matplotlib.pyplot as plt
import seaborn as sns

tips = sns.load_dataset("tips")
# print(tips.info())

fig, ax = plt.subplots(figsize=(10, 6))
sns.scatterplot(x = 'total_bill', y = 'tip', hue = 'sex', data = tips)
plt.show()
```


    
![png](/images/visulization_tutorial_01/output_16_0.png)
    



```python
# 두개의 그래프를 동시에 표현
fig, ax = plt.subplots(nrows=1, ncols=2, figsize=(15, 5))
sns.regplot(x = "total_bill", y = "tip", data = tips , ax = ax[1], fit_reg = True)
ax[1].set_title("with linear regression line")

sns.regplot(x = "total_bill", y = "tip", data = tips , ax = ax[0], fit_reg = False)
ax[0].set_title("without linear regression line")
plt.show()
```


    
![png](/images/visulization_tutorial_01/output_17_0.png)
    


- 막대 그래프 그리기 seaborn 방신


```python
sns.countplot(x = "day", data = tips)
plt.show()
```


    
![png](/images/visulization_tutorial_01/output_19_0.png)
    



```python
print(tips['day'].value_counts().index)
print(tips['day'].value_counts().values)
print(tips['day'].value_counts(ascending=True)) # 오름차순
```

    CategoricalIndex(['Sat', 'Sun', 'Thur', 'Fri'], categories=['Thur', 'Fri', 'Sat', 'Sun'], ordered=False, dtype='category')
    [87 76 62 19]
    Fri     19
    Thur    62
    Sun     76
    Sat     87
    Name: day, dtype: int64
    


```python
fig, ax = plt.subplots()
ax = sns.countplot(x = "day", data = tips, order = tips['day'].value_counts().index)

for plot in ax.patches:
  # print(plot)
  height = plot.get_height()
  ax.text(plot.get_x() + plot.get_width()/2., height, height, ha = 'center', va = 'bottom')

ax.set_ylim(-5, 100) # y축 값 변경
plt.show()
```


    
![png](/images/visulization_tutorial_01/output_21_0.png)
    

