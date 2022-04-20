---
title: "Setting up Apache-NiFi in Windows 11(아파치 Nifi)"
author: "winters"
date: '2022-04-20'
categories: 'nifi'
tags: 'nifi'
---


- 이 글은 Evan 님의 [https://dschloe.github.io/settings/apache_airflow_using_wsl2/](https://dschloe.github.io/settings/apache_airflow_using_wsl2/) 글을 참고하여 작성된 글 입니다.
    
    ---
    

# 개요

- Windows 11 에서 NIFI를 설치 및 설정을 하는 것을 설명한다.

## Step 01. Nifi 다운로드

- 먼저 웹사이트에 접속하다.
    - URL: **[https://www.apache.org/dyn/closer.lua?path=/nifi/1.16.0/nifi-1.16.0-bin.zip](https://www.apache.org/dyn/closer.lua?path=/nifi/1.16.0/nifi-1.16.0-bin.zip)**
        
        ![png](images/Apache_NiFi_in_Windows11/1.png)
        
        ---
        
- HTTP 아래에 있는 링크를 클릭하여 파일을 다운로드 받은 후 C드라이브에 압축을 풀어준다.
    
    ![png](images/Apache_NiFi_in_Windows11/2.png)
    

## Step 02. Java 환경 설정

- 먼저 Nifi를 사용하려면 Java 설치를 해야 하는데 설치 내용은 아래 블로그를 참조한다.
    - 참고 URL: **[https://maktony.tistory.com/13](https://maktony.tistory.com/13)**

## Step 03. run-nifi 배치 파일 실행

- <u><span style="color:red">`run-nifi`</span></u> 파일을 관리자 권한으로 실행한다. (경로 c/nifi-1.16.0/bin/run-nifi.bat)
    
    ![png](images/Apache_NiFi_in_Windows11/3.png)
    
    ---
    
- 아래와 같은 메시지가 출력이 되면 정상적으로 세팅한 것이다.
    
    ![png](images/Apache_NiFi_in_Windows11/4.png)
    
    ---
    

## Step 04. Web UI 확인

- Web UI를 확인해본다. (약 1분 지난 뒤)
    - Web UI: https://127.0.0.1:8443/nifi/login
        
        ![png](images/Apache_NiFi_in_Windows11/5.png)
        
        ---
        
- 간혹 안 나오는 경우가 있다. 그럴 경우에는 새로운 CMD 파일을 연 후, Process ID를 서로 비교 대조해본다.
    
    ```bash
    $ netstat -ano | find "8443"
    ```
    
    ![png](images/Apache_NiFi_in_Windows11/6.png)
    
    ---
    

## Step 05. 로그인 ID 찾기 및 접속

- 우선 별도로 설정을 하지 않았다면, 자동으로 생성이 된다.
- logs/nifi-app 로그파일에서 메모장으로 연 후, 검색을 한다. (Ctrl + F, Username)
    
    ![png](images/Apache_NiFi_in_Windows11/7.png)
    
    ---
    
- 로그인을 하면, 아래와 같은 화면으로 접속이 되는 것을 확인할 수 있다.
    
    ![png](images/Apache_NiFi_in_Windows11/8.png)