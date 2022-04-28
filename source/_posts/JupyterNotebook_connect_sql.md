---
title: 'Jupyter Notebook에서 SQL 실행'
author: 'winters'
date: '2022-04-28'
categories: 'SQL'
tags: 'Jupyter'
---

- 이 글은 **Hanjeongin** 님의 [https://rain-grouse-1fe.notion.site/Jupyter-Notebook-SQL-0973777326e2426da0797f75c09ad0bb](https://www.notion.so/Jupyter-Notebook-SQL-0973777326e2426da0797f75c09ad0bb) 노션(Notion)을 참고하여 작성된 글 입니다.

---

# 개요

- 작성한 SQL 파일 및 코드들을 Jupyter Notebook에서 실행 하기 위한 설정하는 과정을 설명한다.
- 필자는 평소 Jupyter Notebook을 VSCode로 실행하여 VSCode를 통해 설명을 하는데 Jupyter Lab 또는 Jupyter Notebook을 직접 실행하여 설정해도 무방하다.

---

# Step 1. 라이브러리 설치

- 공통적으로 다음 라이브러리를 설치한다.

```bash
pip install ipython-sql
```

![png](images/JupyterNotebook_connect_sql/1.png)

---

- 다음으로 접속하려는 DB에 맞춰서 라이브러리를 설치한다.

  ```bash
  # sql server
  pip install pyodbc

  # PostgreSQL
  pip install pyscopg2

  # MySQL
  pip install PyMySQL

  # Oracle
  pip install cx_Oracle
  ```

  ![png](images/JupyterNotebook_connect_sql/2.png)

---

# Step 2. Jupyter Notebook SQL 연결

- 필자는 VSCode를 사용하여 Jupyter Notebook을 사용하여 VSCode를 사용하여 작성하였다.
- VScode를 실행하여 아래 사진에서 밑줄 친 새 파일을 클릭하면 <u><span style="color:red">`Jupyter Notebook(.ipynb)`</span></u> 형식으로 파일을 생성한다.
  ![png](images/JupyterNotebook_connect_sql/3.png)
  ***
- 생성한 파일에 매직 명령어로 아래와 같은 코드를 입력한 뒤 실행하면 pakage 설치 안내창이 나오는데 설치한다.
  ```bash
  %load_ext sql
  ```
  ![png](images/JupyterNotebook_connect_sql/4.png)

## 모듈 에러(**ModuleNotFoundError**: No module named 'sql')

- 이 에러는 sql이라는 이름의 모듈을 설치가 안되었을때 나오는 에러인데 라이브러리를 설치를 해줬는데도 불구하고 <u><span style="color:red">`ModuleNotFoundError: No module named 'sql'`</span></u> 라는 에러가 나온다. 그럴 땐 내가 설치를 한 라이브러리가 어느 경로에 저장되었는지 확인해야 한다. (필자는 설치를 할 때 나온 메세지를 통해 확인함.)
  ```bash
  import sys
  sys.executable   -- 현재 파일 파이썬 경로 확인
  ```
- 필자는 VSCode로 생성한 파일의 파이썬 경로와 다른 경로에 설치가 되어 위와 같은 오류가 생성되었던 것이다. 그렇다고 환경 변수를 새로 설정하기에는 너무 복잡하니, 파이썬 파일을 새로 만들어 설치된 경로와 맞춰주겠다.
- 아래 사진 우측 상단에 밑줄 친 상자 클릭을 한다.
  ![png](images/JupyterNotebook_connect_sql/5.png)
  ***
- 아래 사진에서 필자의 컴퓨터에서 파이썬 라이브러리가 저장된 경로는 두번째 항목이기 때문에 클릭을 하면 설정이 바뀐다.
  ![png](images/JupyterNotebook_connect_sql/6.png)
  ![png](images/JupyterNotebook_connect_sql/7.png)
  ***
- Step 2 방법으로 한번 더 실행하면 아래 사진 과 같이 오류 없이 정상적으로 실행된다.
  ![png](images/JupyterNotebook_connect_sql/8.png)
  ***

# DB 접속

- 접속하려는 DB에 맞는 코드를 입력 후 실행

  ```bash
  # SQL Server
  %sql mssql+pyodbc://user_name:password@host:port_number/db

  # PostgreSQL
  %sql postgresql://user_name:password@host:port_number/db

  # MySQL
  %sql mysql://user_name:password@host:port_number/db

  # Oracle
  %sql oracle://user_name:password@127.0.0.1:port_number/db
  ```

  - user_name, password, port_number,db 등을 확인하려면 Oracle SQL Developer을 실행하여 해당 DB 우클릭 후 속성에 들어가면 상세히 적혀 있다.
    ![png](images/JupyterNotebook_connect_sql/9.png)
    ***
    ![png](images/JupyterNotebook_connect_sql/10.png)
    ***

- 각자 DB에 맞게 작성 하면 아래 사진과 같이 정상적으로 DB 연결이 되었다고 나온다.
  ![png](images/JupyterNotebook_connect_sql/11.png)

---

- 코드 작성이 잘되는지 테스트 해본다.

  ```bash
  # sql 실행문 (%%sql)을 붙이고 실행
  %%sql

  SELECT *
  FROM employees
  ```

  ![png](images/JupyterNotebook_connect_sql/12.png)
