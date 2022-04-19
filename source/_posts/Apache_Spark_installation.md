---
title: "Apache Spark installation on windows 11(아파치 스파크)"
author: "winters"
date: '2022-04-19'
categories: 'Spark'
tags: 'Spark'
---


- 이 글은 ****Apache Spark(아파치 스파크) 설치 및 환경 설정에 관해 설명하고 있으며**** [https://dschloe.github.io/python/python_edu/00_settings/spark_installation_windows_10/](https://dschloe.github.io/python/python_edu/00_settings/spark_installation_windows_10/) 블로그를 참고하여 작성 한 것입니다.

---

# 사전준비

- Python3 가 설치가 되어야 가능하기 때문에 설치가 되어있지 않다면 [아나콘다(Anaconda)](https://www.anaconda.com/products/distribution)에 접속하여 설치 바랍니다.

# 다운로드 전 필수 확인사항

- 스파크 설치 전에는 반드시 체크해야 하는 사항이 있다. (System Compatibility)
- 2022년 1월 기준은 아래와 같다.

Get Spark from the **[downloads page](https://spark.apache.org/downloads.html)** of the project website. This documentation is for Spark version 3.2.0. Spark uses Hadoop’s client libraries for HDFS and YARN. Downloads are pre-packaged for a handful of popular Hadoop versions. Users can also download a “Hadoop free” binary and run Spark with any Hadoop version **[by augmenting Spark’s classpath](https://spark.apache.org/docs/latest/hadoop-provided.html)**. Scala and Java users can include Spark in their projects using its Maven coordinates and Python users can install Spark from PyPI.

If you’d like to build Spark from source, visit **[Building Spark](https://spark.apache.org/docs/latest/building-spark.html)**.

Spark runs on both Windows and UNIX-like systems (e.g. Linux, Mac OS), and it should run on any platform that runs a supported version of Java. This should include JVMs on x86_64 and ARM64. It’s easy to run locally on one machine — all you need is to have <u><span style="color:red">`java`</span></u> installed on your system <u><span style="color:red">`PATH`</span></u>, or the <u><span style="color:red">`JAVA_HOME`</span></u> environment variable pointing to a Java installation.

Spark runs on Java 8/11, Scala 2.12, Python 3.6+ and R 3.5+. Python 3.6 support is deprecated as of Spark 3.2.0. Java 8 prior to version 8u201 support is deprecated as of Spark 3.2.0. For the Scala API, Spark 3.2.0 uses Scala 2.12. You will need to use a compatible Scala version (2.12.x).

For Python 3.9, Arrow optimization and pandas UDFs might not work due to the supported Python versions in Apache Arrow. Please refer to the latest **[Python Compatibility](https://arrow.apache.org/docs/python/install.html#python-compatibility)** page. For Java 11, <u><span style="color:red">`-Dio.netty.tryReflectionSetAccessible=true`</span></u> is required additionally for Apache Arrow library. This prevents <u><span style="color:red">`java.lang.UnsupportedOperationException: sun.misc.Unsafe or java.nio.DirectByteBuffer.(long, int) not available`</span></u> when Apache Arrow uses Netty internally.

# 자바 설치

- 자바를 설치한다. 설치 파일은 아래 링크에서 각자 환경에 맞는 프로그램을 다운로드 받는다.
    - JAVA: [https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
    - 설치 시, 오라클 로그인이 필요 할 수도 있으므로 계정이 없는 경우 생성 후 시도 바랍니다.

## Step 01. 설치

- 다운로드 파일을 관리자로 실행한다. 계속 Next 버튼 클릭 후, 아래 파일에서 경로를 수정한다. (이 때, <u><span style="color:red">`Program Files`</span></u> 공백이 있는데, 이러한 공백은 환경 설치 시 문제가 될 수 있다.)
    
    ![png](images/Apache_Spark_installation/1.png)
    

---

- Foder name(경로)를 아래와 같이 변경 후 OK 클릭을 하면 설치가 완료된다.
    
    ![png](images/Apache_Spark_installation/2.png)
    

---

- 이번에는 자바 런타임 환경의 폴더도 동일하게 변경해준다. (변경 클릭 후 수정)
    - C드라이브 경로에 <u><span style="color:red">`jre`</span></u> 폴더를 생성하고 저장한다.
    
    ![png](images/Apache_Spark_installation/3.png)
    
    ---
    

# Spark 설치

### (1) Spark file 설치

- 아래 링크를 통해 Spark를 설치한다.
    - Spark: [https://spark.apache.org/downloads.html](https://spark.apache.org/downloads.html)
    - 밑줄 친 항목 버전 확인 후 3번째 줄인 [spark-3.2.1-bin-hadoop3.2.tgz](https://www.apache.org/dyn/closer.lua/spark/spark-3.2.1/spark-3.2.1-bin-hadoop3.2.tgz) 클릭
        
        ![png](images/Apache_Spark_installation/4.png)
        
    
    ---
    
    - HTTP 아래에 있는 페이지를 클릭하면 다운로드 받을 수 있다.
        
        ![png](images/Apache_Spark_installation/5.png)
        
        ---
        

### (2) WinRAR 프로그램 다운로드

- <u><span style="color:red">`.tgz`</span></u> 파일 압축을 풀기 위해 <u><span style="color:red">`WinRAR`</span></u> 을 설치한다.
    - WinRAR: **[https://www.rarlab.com/download.htm](https://www.rarlab.com/download.htm)**
    - 링크에 들어가면 아래 화면이 보이는데 각 컴퓨터 환경에 맞게 설치 바랍니다.
        
        ![png](images/Apache_Spark_installation/6.png)
        
        ---
        
    - 다운로드가 완료 되면 위 과정 (1)에서 설치했던 <u><span style="color:red">`spark-3.2.0-bin-hadoop3.2.tgz`</span></u> 파일 압축 풀기(Extract) 실행

### **(3) spark 폴더 생성 및 파일 이동**

- C드라이브 안에 <u><span style="color:red">`spark`</span></u> 라는 새로운 폴더 생성 후 앞 서 압축을 풀었던 파일 <u><span style="color:red">`spark-3.2.0-bin-hadoop3.2`</span></u> 폴더 내 모든 파일을 생성한 <u><span style="color:red">`spark`</span></u> 폴더로 옮긴다.
    
    ![png](images/Apache_Spark_installation/7.png)
    
    ---
    

### (4) [log4j.properties](http://log4j.properties) 파일 수정

- <u><span style="color:red">`conf`</span></u> - <u><span style="color:red">`[log4j.properties](http://log4j.properties)`</span></u> 파일을 연다.
    
    ![png](images/Apache_Spark_installation/8.png)
    
    ---
    

- 해당 파일을 메모장으로 연 후(필자는 vscode로 연결), 아래에서 빨간줄을 친 <u><span style="color:red">`log4j.rootCategory=INFO`</span></u> 에서 <u><span style="color:red">`INFO`</span></u> → <u><span style="color:red">`ERROR`</span></u> 로 변경한다.
    - 작업 실행 시, 출력하는 모든 logs 값들을 없앨 수 있다.
        
        ![png](images/Apache_Spark_installation/9.png)
        
        ---
        

# winutils 설치

- 이번에는 스파크가 윈도우 로컬 컴퓨터가 Hadoop을 착각하게 만들 프로그램이 필요하다.
    - 설치파일: **[https://github.com/cdarlint/winutils](https://github.com/cdarlint/winutils)**
        - 여기에서 최신 버전의 winutils를 다운로드 받는다.
            
            ![png](images/Apache_Spark_installation/10.png)
            
            ---
            
    - 필자는 **[hadoop-3.2.2](https://github.com/cdarlint/winutils/tree/master/hadoop-3.2.2)** 버전을 다운로드 받았다.
- C드라이브에서 winutils란 이름의 폴더를 생성한 후, 앞서 받은 [hadoop-3.2.2](https://github.com/cdarlint/winutils/tree/master/hadoop-3.2.2) 파일의 bin 폴더를 옮긴다.
    
    ![png](images/Apache_Spark_installation/11.png)
    
    ---
    
- 이 파일이 Spark 실행 시, 오류 없이 실행될 수 있도록 CMD 프로그램에서 파일 사용 권한을 얻도록 한다.
    - CMD 프로그램을 관리자 권한으로 실행 후 아래 코드 입력
    
    ```bash
    C:\Windows\system32>cd c:\winutils\bin # 경로 변경
    c:\winutils\bin> winutils.exe chmod 777 \tmp\hive
    ```
    
    - 만약, ChangeFileModeByMask error (3) 에러 발생 시, C드라이브에 <u><span style="color:red">`tmp\hive`</span></u> 폴더를 차례대로 생성을 한다.
        
        ---
        

# 환경변수 설정

- 시스템 환경 변수를 설정한다.
    - 시스템 환경 변수 검색 후 클릭
        
        ![png](images/Apache_Spark_installation/12.png)
        
        ---
        
    - 환경 변수 클릭
        
        ![png](images/Apache_Spark_installation/13.png)
        
        ---
        
    - 각 사용자 계정에 <u><span style="color:red">`사용자 변수 - 새로 만들기 버튼`</span></u> 을 클릭
        
        ![png](images/Apache_Spark_installation/14.png)
        
        ---
        
    - SPARK_HOME 환경 변수를 설정한다.
        
        ![png](images/Apache_Spark_installation/15.png)
        
        ---
        
    - JAVA_HOME 환경 변수를 설정한다.
        
        ![png](images/Apache_Spark_installation/16.png)
        
        ---
        
    - HADOOP_HOME 환경 변수를 설정한다.
        
        ![png](images/Apache_Spark_installation/17.png)
        
        ---
        
    
    - 이번에는 `PATH` 변수를 편집한다.
        
        ![png](images/Apache_Spark_installation/18.png)
        
        ---
        
    - 아래 코드를 추가한다.
        - %SPARK_HOME%\bin
        - %JAVA_HOME%\bin
            
            ![png](images/Apache_Spark_installation/19.png)
            
            ---
            
    

# 파이썬 환경 설정

- Python 환경 설정을 추가한다.
    
    ![png](images/Apache_Spark_installation/20.png)
    
    ---
    

# 스파크 테스트

- CMD 파일을 열고 <u><span style="color:red">`c:\spark`</span></u> 폴더로 경로를 설정 한 뒤 <u><span style="color:red">`pyspark`</span></u> 로 실행
    
    ```bash
    cd c:\spark # 경로를 c:\spark 로 설정
    pyspark # 실행
    ```
    
    ![png](images/Apache_Spark_installation/21.png)
    
    ---
    
- 해당 <u><span style="color:red">`[README.md](http://README.md)`</span></u> 파일을 불러와서 아래 코드가 실행되는지 확인한다.
    
    ```bash
    >>> rd = sc.textFile("README.md")
    >>> rd.count()
    109
    >>>
    ```