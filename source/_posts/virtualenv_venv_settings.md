---
title: "가상 환경 설정(venv) to Git Bash, VScode"
author: "winters"
date: '2022-04-19'
categories: 'venv'
tags: 'venv'
---


## 개요

- 이 글은 Git Bash와 VScode를 이용한 폴더 생성 및 가상 환경을 설정 하여 구동(activate)하는 과정을 설명한 글 입니다.

## (1) Git bash

- git bash 프로그램을 실행하여 설정 할 경로를 잡아준다.
    - 참고: 아래는 git bash 프로그램의 간단한 명령어 이다
        
        ```bash
        cd ..             # 상위 폴더인 이전 경로로 이동
        cd '{폴더이름}'    # 하위 폴더의 폴더이름으로 경로 이동
        ls                # 현재 경로의 하위 폴더 및 파일을 나타내줌
        ```
        
    - 필자는 c드라이브로 폴더를 생성하겠다.
    
    ![png](images/virtualenv_venv_settings/1.png)
    
    ---
    
- 해당 경로에 폴더를 생성한 뒤 경로를 이동한다.
    
    ```bash
    mkdir "{폴더이름}" # 폴더 생성
    cd "{폴더이름}" # 경로 이동
    ```
    
    ![png](images/virtualenv_venv_settings/2.png)
    
    ---
    
- <u><span style="color:red">`code .`</span></u> 을 입력하여 VScode 프로그램을 실행 및 파일을 불러온다.
    
    ![png](images/virtualenv_venv_settings/3.png)
    
    ![png](images/virtualenv_venv_settings/4.png)
    
    ---
    

## (2) VScode

- 연결된 Vscode 프로그램에서 터미널(Terminal)창을 켠 뒤 bash로 설정
    
    ![png](images/virtualenv_venv_settings/5.png)
    
    ---
    
- <u><span style="color:red">`virtualenv venv`</span></u> 로 가상 환경 폴더 생성
    - venv라는 폴더가 생성 되면 정상적으로 실행 된 것이다.
    - **<u><span style="color:red">`bash: virtualenv: command not found : virtualenv`</span></u>** virtualenv ****설치가 안되어 있어서 생기는 오류 **,** <u><span style="color:red">`pip install virtualenv`</span></u> 로 설치 한 뒤 , <u><span style="color:red">`virtualenv venv`</span></u> 한번 더 실행.
    
    ![png](images/virtualenv_venv_settings/6.png)
    
    ---
    
- <u><span style="color:red">`source venv/Scripts/activate`</span></u> 로 가상 환경 설정, 정상적으로 실행이 되면 경로 맨앞에 (venv)라는 문구가 나타난다.
    
    ![png](images/virtualenv_venv_settings/7.png)
    
    - Tip: source v를 입력후 Tap키를 눌렀을때 venv가 나오면 정상적으로 실행가능.
        
        ---
        
- 로컬 환경으로 다시 전환 하려면 <u><span style="color:red">`deactivate`</span> 로 가능하다.
    
    ![png](images/virtualenv_venv_settings/8.png)