---
title: "Setting up Apache-Airflow in Windows using WSL2(아파치 에어플로)"
author: "winters"
date: '2022-04-20'
categories: 'Airflow'
tags: 'Airflow'
---


- 이 글은 Evan 님의 [https://dschloe.github.io/settings/apache_airflow_using_wsl2/](https://dschloe.github.io/settings/apache_airflow_using_wsl2/) 글을 참고하여 작성된 글 입니다.

---

# 개요

- windows WSL2에서 airflow를 설치 및 설정에 대해서 설명한다.

## Step 1. Install pip on WSL

- 우선 airflow를 설치하기 위해 pip를 설치한다

```bash
$ sudo apt install python3-pip
[sudo] password for username:
```

## Step 2. Install virtualenv package

- 가상 환경 라이브러리인 virtualenv 를 설치한다.
    
    ```bash
    $ sudo pip install virtualenv
    ```
    

## Step 3. Create a virtual environment

- C드라이브에 airflow-test 폴더를 생성한 뒤 해당 디렉터리로 이동한다.
- 가상 환경을 생성한 후, 가상 환경에 접속한다.
    
    ```bash
    $ virtualenv venv # 가상 환경 생성
    $ source venv/bin/activate # 가상 환경 접속
    
    ```
    
- .bashrc 파일을 수정한다
    
    ```bash
    $ vi ~/.bashrc
    ```
    
- 파일을 연 후, 다음과 같은 코드를 추가한다.
    
    ```bash
    export AIRFLOW_HOME=/mnt/c/airflow-test
    ```
    
    - 리눅스 환경에서 파일을 읽고 쓰는 모드 설정 및 입력 모드에서의 단축키는 생소 할수 있으므로 아래 사이트 참고 하여 코드를 수정한다.
        - 파일을 저장하고 닫을 때는 ESC → :wq  , 저장하지 않고 닫을 때는 ESC → :q!
        - vi 명령어 참고 사이트: [https://blockdmask.tistory.com/25](https://blockdmask.tistory.com/25)
- 수정 된 코드를 업데이트 한 뒤, 코드가 제대로 반영되었는지 확인한다.
    
    ```bash
    $ source ~/.bashrc # 업데이트
    $ echo $AIRFLOW_HOME # 코드 정상 반영 확인
    ```
    

## Step 4. Apache Airflow 설치

- PostgreSQL, Slack, Celery 패키지를 동시에 설치한다.
    
    ```bash
    $ pip3 install 'apache-airflow[postgres, slack, celery]'
    ```
    
- 에어플로우를 실행 하기 위해 DB 초기화를 해줘야 한다.
    
    ```bash
    $ airflow db init # DB 초기화
    ```
    
- 실제로 잘 구현 되었는지 확인을 하기 위해 webserver를 실행한다.
    
    ```bash
    $ airflow webserver -p 8080
    ```
    
    - webserver는 airflow.cfg파일의 <u><span style="color:red">`endpoint_url`</span></u> 주소를 확인 후 설정한다.(필자는 8080으로 되어 있어서 위와 같은 코드로 실행함)
    
    ![png](images/Apache_Airflow/1.png)
    
    ---
    
- 다음으로 일정 주기로 데이터 흐름이 실행되게 하려면 Scheduler가 필요하다.
    
    ```bash
    airflow scheduler
    ```
    
    - 위와 같이 <u><span style="color:red">`airflow webserver -p 8080`</span></u> 과 <u><span style="color:red">`airflow scheduler`</span></u> 를 실행하려면 2개의 wsl 창이 필요하다.
- 생성한 [http://localhost:8080/login/에](http://localhost:8080/login/에) 접속하면 아래와 같은 화면이 나타난다.
    
    ![png](images/Apache_Airflow/2.png)
    
    ---
    
- cntrl+c로 작업을 해제하고 이제 로그인을 하기 위해 회원 가입을 하도록 한다.
    
    ```bash
    # users create
    $ airflow users create --username airflow --password airflow --firstname winters evan --lastname airflow --role Admin --email your_email@some.com
    ```
    
    - username(ID)와 password는 airflow로 한뒤 나머지 lastname, email은 사용자에 맞게 수정한다.
- 다시 webserver와 Schedule를 실행한 뒤 로그인을 하면 정상적으로 다양한 DAGs 파일이 나타난 것을 확인할 수 있다.
    
    ![png](images/Apache_Airflow/3.png)
    

## Default 예제 제거하기

- load_examples를 없애고 내가 생성 및 수정한 DAGs들만 보이고 싶다면 <u><span style="color:red">`airflow.cfg`</span></u> 파일을 열고, <u><span style="color:red">`load_examples = True`</span></u> 로 되어 있는 것을 <u><span style="color:red">`load_examples = False`</span></u> 로 변경한다.
    
    ![png](images/Apache_Airflow/4.png)
    
    ---
    
- 그 후에, 다시 터미널로 돌아와서 <u><span style="color:red">`airflow db reset`</span></u> 실행한다.
    
    ![png](images/Apache_Airflow/5.png)
    
    ---
    
- <u><span style="color:red">`webserver`</span></u> 를 실행하여 확인
    
    ![png](images/Apache_Airflow/6.png)