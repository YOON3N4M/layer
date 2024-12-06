# NTTZM

신규 프로젝트 생성시 필수적으로 필요한 컴포넌트 및 유틸리티 함수,config 등을 템플릿화 <br/>
프로젝트 폴더링 구조는 containers 방식으로 구성 <br/>

상세한 구성과 주의사항은 아래 기재

## 기본 환경
### 프레임워크 및 라이브러리
* <strong>next.js</strong> 14.2.5 app router (react 18)
* <strong>tailwind</strong> 3.4.1
* <strong>typescript</strong> 5
* <strong>zustand</strong> 5.0.2
* <strong>motion</strong> (framer motion) 11.13.1
* react-icons 5.4.0
* Pretendard 폰트
* sharp


## 소스

#### components
* modal
> * ModalPortal <br/>
모달이 돔에 위치하는 영역 RootLayout에 배치
> * useModal <br/>
컴포넌트에서 모달을 컨트롤 하기위한 hook (store를 제어함)
> * store <br/>
중첩 모달 등 전역적으로 모달을 관리
* toast
> * ToastPortal <br/>
토스트가 돔에 위치하는 영역 RootLayout에 배치
> * useToast <br/>
컴포넌트에서 토스트 컨트롤 하기위한 hook (store를 제어함)
> * store <br/>
전역적으로 토스트 관리
> * message <br/>
토스트 메세지 일관성 유지
* svg/index
> react-icons를 통해 import한 svg를 컴포넌트로써 export
* loadingSpinner

#### hooks
* useDeviceDetect
> 기기(스크린 사이즈)를 감지

#### config
* global.css

* tailwind config
> * content/container
> * spacing
> * fade keyframes 

## 주의
아래 텍스트를 전체 검색 후 내용 수정 후 프로젝트 진행 필요함. <br/>
ex) breakpoints, inner, modal size등 
> /* 프로젝트 성격에 맞게 수정 필요 */


