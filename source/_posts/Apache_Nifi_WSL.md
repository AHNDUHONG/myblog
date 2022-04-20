---
title: "Apache NiFi 설치와 설정 in WSL2"
author: "winters"
date: '2022-04-20'
categories: 'nifi'
tags: 'WSL2'
---


- 이 글은 Evan 님의 [https://dschloe.github.io/settings/apache_airflow_using_wsl2/](https://dschloe.github.io/settings/apache_airflow_using_wsl2/) 글을 참고하여 작성된 글 입니다.
    
    ---
    

# 개요

- WSL2 프로그램을 사용하여 가상 환경에서 Apache Nifi 설치 및 설정하는 과정을 설명한다.

## Step 01. Java 설치 및 설정

- wls2에서 Java를 설치 한다.

```bash
$ sudo apt-get update && sudo apt-get upgrade
$ sudo apt install openjdk-11-jre-headless
```

- 환경 변수 설정을 한다.
    
    ```bash
    $ vi ~/.bash_profile
    export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
    ```
    
    ![png](images/Apache_Nifi_WSL/1.png)
    
    ---
    
    - WSL(Windows Subsystem for Linux)는 리눅스 환경 이기 때문에 일반 terminal 창과는 다른 명령어를 사용한다. 명령어는 아래 사이트를 참고하여 작성하길 바란다.
        - vi 명령어 참고 사이트: [https://blockdmask.tistory.com/25](https://blockdmask.tistory.com/25)

## Step 02. Nifi 설치 및 설정

- curl을 이용하여 Nifi를 현재 경로에 받는다.
    
    ```bash
    $ sudo wget https://downloads.apache.org/nifi/1.16.0/nifi-1.16.0-bin.tar.gz
    ```
    
- .tar.gz 파일의 압축을 푼다.
    
    ```bash
    $ sudo tar xvzf nifi-1.16.0-bin.tar.gz
    ```
    
- <u><span style="color:red">`nifi-1.16.0/bin`</span></u> 폴더로 경로를 이동한다
    
    ```bash
    # cd nifi-1.16.0/bin
    ```
    
    ![png](images/Apache_Nifi_WSL/2.png)
    
    ---
    
    - 필자의 경로는 <u><span style="color:red">`root/nifi-1.16.0/bin`</span></u> 이다.

- <u><span style="color:red">`ls`</span></u> 를 입력하여 현재 경로에 <u><span style="color:red">`nifi-env.sh`</span></u> 파일이 있는지 확인
    
    ![png](images/Apache_Nifi_WSL/3.png)
    
    ---
    
- 환경 변수를 설정 한다.
    
    ```bash
    $ sudo vi nifi-env.sh
    export JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"
    ```
    
    ![png](images/Apache_Nifi_WSL/4.png)
    
    ---
    

## Step 03. Nifi 실행

- [nifi-env.sh](http://nifi-env.sh) 파일을 실행 한다.
    
    ```bash
    $ sudo ./nifi.sh start
    ```
    
    ![png](images/Apache_Nifi_WSL/5.png)
    
    ---
    
- <u><span style="color:red">`nifi-1.16.0/conf`</span></u>에 있는 <u><span style="color:red">`nifi.properties`</span></u>를 열어 webserver 주소를 확인한다.
    
    ```bash
    vi nifi.properties
    # 경로 /nifi-1.16.0/conf 
    ```
    
    ![png](images/Apache_Nifi_WSL/6.png)
    
    ---
    
    ![png](images/Apache_Nifi_WSL/7.png)
    
    ---
    
- Nifi 화면에 접속한다.
    - https://127.0.0.1:8443/nifi/login
        
        ![png](images/Apache_Nifi_WSL/8.png)
        
        ---
        
- Username과 Password를 생성한다.(사용자에 맞게 생성 가능)
    
    ```bash
    $ sudo ./bin/nifi.sh set-single-user-credentials human 1234567890123
    # username: human
    # password :1234567890123
    ```
    
- 재 실행하여 로그인을 해본다.
    
    ![png](images/Apache_Nifi_WSL/9.png)
    
    ---