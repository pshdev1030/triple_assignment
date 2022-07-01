# 프로젝트 명

TRIPLE 과제

## 프로젝트 개요

안녕하세요. 프론트엔드 개발자 박성현입니다.

TRIPLE의 과제전형으로 트리플의 홈페이지의 한 섹션을 구현하였습니다.

## 폴더구조

```bash
├── node_modules
├── public
├── src
│   ├── assets // 이미지와 같은 정적파일
│   ├── components // 재사용 가능한 컴포넌트
│   ├── hooks // 재사용 가능한 커스텀 훅
│   ├── App.js // 메인화면
│   ├── index.css // global에서 사용할 css
│   └── index.js // 진입점
├── README.md // 프로젝트 설명
└── package.json
```

## 배포 주소

https://triple-assignment-parksunghyeon.vercel.app/

## 실행방법

```
npm i
npm run start
```

## 사용한 기술

요구사항에 따라 UI 라이브러리로 `React`를 사용하였습니다.

또한 스타일링에는 `@emotion/react`와 `@emotion/styled`를 사용하였습니다.

사용한 이유는 다음과 같습니다.

1. HTML 요소의 className property와 css를 사용하여 스타일링 하는 것보다 `@emotion/styled`를 사용하여 JSX를 표현하는 것이 더욱 가독성이 좋습니다.

```jsx
// HTML 요소 사용
<div className="content-wrapper">{children}</div>
// @emotion/styled 사용
<ContentWrapper>{children}</ContentWrapper>
```

2. props를 사용 가능하고 확장성이 좋습니다.

`@emotion/styled`로 작성된 FadeIn 컴포넌트는 duration과 delay를 받아서 `@emotion/react`의 애니메이션의 속성을 제어합니다.

```js
const FadeInWrapper = styled.div`
  animation: ${fadeInEffect} ${(props) => props.duration}ms 1;
  animation-delay: ${(props) => props.delay}ms;
`
```

```jsx
<FadeInWrapper duration={duration} delay={delay}>
  {children}
</FadeInWrapper>
```

`@emotion/styled`를 사용하지 않고 css만으로 작성하려면 duration과 delay에 따라 중복되는 클래스명을 새로 만들거나 HTML의 dataset을 이용하여 제어해야 합니다.

```css
.fadein_1 {
  animation: fadeInEffect 700ms 1;
  animation-delay: 100ms;
}

.fadein_2 {
  animation: fadeInEffect 700ms 1;
  animation-delay: 200ms;
}

.fadein_3 {
  animation: fadeInEffect 700ms 1;
  animation-delay: 300ms;
}
```

```jsx
<div className="fadein_1">{children}</div>
<div className="fadein_2">{children}</div>
<div className="fadein_3">{children}</div>
```

이는 확장성이 좋지 않고, 컴포넌트화하기 어렵습니다.

마찬가지로 `@emotion/styled`와의 호환과 같은 확장성을 이유로 `@emotion/react`를 `keyframes`를 선언하는데에 사용하였습니다.

3. 폴더 구조의 이점

복잡한 스타일이 아닌 경우 컴포넌트와 같은 경로에 위치시킬 수 있어 폴더구조의 depth를 깊지 않게 관리할 수 있습니다.

## 구현 시 신경쓴 점

아래는 프로젝트를 진행하며 구현하며 신경쓴 부분에 입니다.

1. 애니메이션 성능

애니메이션의 요구사항은 다음과 같습니다.

- 각 숫자는 0부터 시작합니다.
- 세 숫자 모두 2초 동안 증가하고, 동시에 끝나야 합니다.
- 증가 속도가 느려지는 효과를 구현해야 합니다.
- React와 DOM API만을 이용해 구현해야 합니다.

2번 요구사항으로 인해 `setInterval`을 사용하여 구현할 수 없습니다.
왜냐면 `setInterval`은 js의 이벤트루프를 통해 관리됩니다. (즉 js가 동작하는 메인스레드에서 작동합니다.)

setInterval은 정확한 실행시간을 보장하지 않고, 애니메이션 어러개가 동시에 실행될 경우 프레임이 소실될 가능성이 있습니다.

떄문에 여러개의 애니메이션 실행에도 프레임 유실이 없도록 하며 실행시간을 보장하기 위해선 `requestAnimationFrame`을 사용해서 애니메이션 프레임에서 실행되도록 해야합니다.

3번 요구사항을 구현하는데에도 여러 방법을 생각하였습니다.

맨 처음 생각한 방법은 화면에 표시되는 숫자를 curNum, 목표값을 maxNum이라고 할 때 curNum의 초기값을 maxNum으로 설정하고 `requestAnimationFrame`의 호출마다 다음의 식을 계산하는 방법이였습니다.

```js
curNum = maxNum - curNum * 가중치
```

maxNum이 1000이고 가중치가 0.9일경우 `requestAnimationFrame`의 호출마다 curNum의 값은 다음과 같습니다.

| maxNum | curNum \* 가중치 | curNum | curNum 증가량 |
| ------ | ---------------- | ------ | ------------- |
| 1000   | 1000             | 0      | 0             |
| 1000   | 900              | 100    | 100           |
| 1000   | 810              | 190    | 90            |
| 1000   | 729              | 270    | 80            |
| ...    | ...              | ...    | ...           |

curNum의 증가량이 점점 감소합니다.

`setInterval`을 사용하게 되면 호출주기를 정할 수 있습니다. 호출주기를 정할 수 있다는 말은 애니메이션의 실행 시간(duration)/호출주기를 하게되면 총 몇 번 호출될지를 알 수 있다는 말입니다. 이 호출 횟수를 이용하여 가중치를 정할 수 있습니다.

하지만 `requestAnimationFrame`은 기기의 주사율에 따라 호출주기가 결정되므로 이 호출주기를 쓰로틀링을 이용하여 고정하는 방법 외에는 위의 식으로 구현할 수 없었습니다.

때문에 다른 방법으로 접근하였습니다.

마찬가지로 curNum가 화면에 표시되는 숫자, maxNum이 목표값이라고 할 때 다음과 같은 식으로 해결하였습니다.

```js

function easeOutExpo(t) {
  return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1
}
curNum = maxNum * easeOutExpo(현재시간 / 애니메이션 총 실행시간)
```

즉 증가율이 점점 감소하는 그래프에 애니메이션의 진행률을 곱해서 증가율을 보정하였습니다.

주사율에 상관없이 애니메이션이 작동될 수 있도록 하였습니다.

2. 재사용성과 확장성

재사용 할 수 있는 요소나 확장가능한 요소들을 컴포넌트로 정의하였습니다.

위에서 언급하였듯이 `@emotion/react`와 `@emotion/styled`를 이용하여 애니메이션 컴포넌트를 정의하여 애니메이션이 필요한 컴포넌트를 Wrapping하여 재사용 할 수 있도록 하였습니다.

또한 `hooks` 폴더에 `useIncreaseNumber`라는 커스텀 훅을 작성하여, 필요한 컴포넌트에서 재사용할 수 있도록 하였습니다.

증가하는 숫자인 이 `increaseNumber`은 UI를 위한 상태이기 때문에 `components` 폴더에 `IncreaseNumber`라는 컴포넌트를 만들어 `increaseNumber`를 Fragment로 감싸서 반환해서 UI 상태를 격리하여 부모 컴포넌트의 렌더링을 트리거하지 않도록 하여 렌더링 성능을 최적화 하였습니다.

이렇게 작성된 `IncreaseNumber` 컴포넌트는 `components` 폴더의 `IntroduceItem` 컴포넌트에서 사용됩니다.

이 외의 중복되어 사용되는 요소들 또한 컴포넌트로 작성해 재사용 할 수 있도록 하였습니다.

3. 상수 / 정적 파일

이미지와 같은 정적파일이나 상수값들은 App.js의 최상위에 정의하고 컴포넌트의 props로 내려주어 쉽게 관리할 수 있도록 하였습니다.

4. 이미지 최적화

webp 지원여부에 따라 png 대신 webp를 로드하여 크롬 개발자도구 느린 3g기준 이미지가 약 19% 빠르게 로드될 수 있도록 하였습니다.

## 아쉬운 점

`@emotion/react`는 HTML 요소에 css라는 property를 제공해서 style을 관리합니다. 이는 HTML 표준에 존재하지 않는 속성이기 때문에 바벨에 JSX pragma를 제공해주어야 하는데, 이것이 린팅과 포매팅을 셋업하며 [titicacadev/eslint-config-triple](https://github.com/titicacadev/eslint-config-triple)과 충돌하는 문제가 있어, eslint 셋업을 하지 못하였습니다.
