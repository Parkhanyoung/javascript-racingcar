# 우아한테크코스 레이싱카게임 level1 step1
- 마르코, 동키콩

## 중점사항

- MVC 디자인 패턴 적용
- 함수가 한 가지 기능만 명확히 하도록 작게 만들기

## 구현 기능 목록

### 0. HTML, CSS 레이아웃 구현

- [x] HTML, CSS 레이아웃 구현
- [x] 기능 별로 section을 네개로 나눈다.
    - [x] 헤더 : `<header></header>`
    - [x] 인풋창 모음 섹션 태그 id: `racing-form-container`
    - [x] 경기진행과정 섹션 태그 id: `racing-progress-container`
    - [x] 경기결과 섹션 태그 id: `racing-result-container`

### 1. 자동차 이름 입력 기능

- [x] 자동차 이름은 쉼표(,)를 기준으로 구분한다.
- [x] 아래의 기준 중 하나라도 잘못될 경우 alert을 통해 메시지를 보여준다.
    - [x] 이름은 5자 이하만 가능하다.
    - [x] 이름은 중복을 허용하지 않는다.
    - [x] 이름은 공백을 허용하지 않는다.
    - [x] 자동차 이름은 빈 문자가 되어서는 안된다.
- [x] 참가자 입력이 성공적으로 완료되면 이동 횟수 입력 폼을 활성화 하고 참가자 입력폼을 비활성화한다.

### 2. 이동 횟수 입력 기능

- [x] 아래의 기준 중 하나라도 잘못될 경우 alert을 통해 메시지를 보여준다.
    - [x] 사용자는 몇번 이동할 것인지 입력을 해야한다.
    - [x] 이동횟수는 0이상의 정수가 되어야 한다.
    - [x] 이동횟수가 빈 문자가 되어서는 안된다.
- [x] 이동횟수 입력이 완료 되면 이동횟수 입력폼을 비활성화하고 횟수에 따른 이동 경로를 출력한다.

### 3. 자동차의 이동 기능

- [x] 앞서 입력한 횟수만큼 각 자동차들은 이동을 시작한다.
- [x] 각 자동차들은 0에서 9사이의 무작위 값을 구한 후 무작위 값이 4이상일 경우 전진한다.
- [x] 이동 횟수만큼 각 자동차들의 이동상황을 출력한다.

### 4. 우승자 출력 기능

- [x] 가장 이동한 횟수가 많은 한 대 이상의 자동차를 우승자로 선정한다.
- [x] \`🏆 최종 우승자: 우승자1, 우승자2 🏆`  의 형태로 우승자를 출력한다.


## 테스트코드

- [x] 구현 결과가 요구사항과 일치해야 한다.
    - [x] 게임을 완료하고 우승자를 확인할 수 있어야 한다.
    - [x] 잘못된 자동차 이름 입력 유효성 검사
        - [x] 자동차 이름을 5자 이상 입력한 경우 해당 에러 메세지가 alert에 호출되어야 한다. 
        - [x] 자동차 이름을 중복되게 입력한 경우 해당 에러 메세지가 alert에 호출되어야 한다. 
        - [x] 자동차 이름 안에 공백이 포함되어 입력한 경우 해당 에러 메세지가 alert에 호출되어야 한다. 
        - [x] 자동차 이름을 공백으로 입력한 경우 해당 에러 메세지가 alert에 호출되어야 한다.
- [x] 잘못된 시도 횟수를 입력한 경우 alert가 호출되어야 한다.
    - [x] 시도 횟수를 공백으로 입력한 경우 해당 에러 메세지가 alert에 호출되어야 한다. 
    - [x] 시도 횟수를 음수로 입력한 경우 해당 에러 메세지가 alert에 호출되어야 한다. 
    - [x] 시도 횟수를 정수가 아닌 수로 입력한 경우 해당 에러 메세지가 alert에 호출되어야 한다. 