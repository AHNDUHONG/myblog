---
title: 'VS Code Oracle 연동'
author: 'winters'
date: '2022-04-28'
categories: 'Oracle'
tags: 'VSCode'
---

- 이 글은 Evan 님의 [https://dschloe.github.io/settings/apache_airflow_using_wsl2/](https://dschloe.github.io/sql/vscode_oracle/) 글을 참고하여 작성된 글 입니다.

---

# 개요

- VS code에서 오라클을 연동한다.

# VS Code확장(Extension)

- VS Code 실행 후 사이드 바(side bar)에서 확장(Extension)을 통한 Oracle Developer Tools for VS Code를 설치한다.
  ![png](images/VSCode_Connect_Oracle/1.png)
  ***
- 설치 중간에 아래와 같은 문구가 나오면 해당 파일을 설치해야 한다.
  ![png](images/VSCode_Connect_Oracle/2.png)
  ***

# 필수 설치 파일

- 위 과정을 거치면 아래와 같은 홈페이지에 링크 될 것이다. <u><span style="color:red">`Install .NET Runtime for Windows x64`</span></u>를 클릭하면 다운로드가 된다.
  - 설치 URL: [https://www.oracle.com/database/technologies/appdev/dotnet/install-dotnetcore-windows.html](https://www.oracle.com/database/technologies/appdev/dotnet/install-dotnetcore-windows.html)
    ![png](images/VSCode_Connect_Oracle/3.png)
    ***
- 설치한 파일을 실행하면 설치 관리자가 등장하는데 따로 환경설정 할 부분이 없어서 설치를 클릭하여 설치한다.
  ![png](images/VSCode_Connect_Oracle/4.png)
  ***

# 테스트

- 설치가 완료가 되면 Extension 메뉴 밑에 DB 메뉴가 활성화 되는 것을 확인 할 수 있다.
  ![png](images/VSCode_Connect_Oracle/5.png)
  ***
- 여기에서 VS Code 재 시작을 하도록 한다.
- 빨간색으로 밑줄 친 플러스 모양을 클릭하면 New Connection 버튼이 있는데 클릭하면 새로운 Connection이 생성된다.
  - 단, 여기에서 새로운 Connection은 기존에 이미 만들어진 Connection을 의미한다.
  - 따라서, 기존 SQL Developer에서 생성했던 것과 동일하게 작성을 해야한다.

![png](images/VSCode_Connect_Oracle/6.png)

---

- <u><span style="color:red">`Database host name, Port number, Serviece name, User name, Password, Connection name`</span></u>을 확인 후 작성한다.
  ![png](images/VSCode_Connect_Oracle/7.png)
  ***
- 완료 되면, 아래 그림과 같이 DB가 활성화 된 것을 확인 할 수 있다.
  ![png](images/VSCode_Connect_Oracle/8.png)
  ![png](images/VSCode_Connect_Oracle/9.png)
  ***
- 마우스 우클릭을 하면, 새로운 쿼리 파일을 작성할 수 있다.
  ![png](images/VSCode_Connect_Oracle/10.png)
  ***
- 파일을 작성하면 아래와 같이 Ctrl + E를 눌러 SQL을 실행한다.
  ![png](images/VSCode_Connect_Oracle/11.png)
  ***
- 정상적으로 실행이 되면 아래와 같은 결괏값이 나온다.
  ![png](images/VSCode_Connect_Oracle/12.png)
