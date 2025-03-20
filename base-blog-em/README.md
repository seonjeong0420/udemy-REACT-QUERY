# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React-Query

### query client

쿼리 관리 + 서버 데이터를 저장하는 클라이언트

### prefetchQuery

- 쿼리 클라이언트의 메소드
- useQueryClient 훅을 사용해서 쿼리 클라이언트를 가져올 수 있다.
- 데이터 prefetching 처리하여 캐시된 데이터를 화면에 보여준다.

### QueryProvider

자식 컴포넌트에 캐시 및 클라이언트 구성을 제공할 프로바이더
쿼리 클라이언트를 값으로 사용

### useQuery

서버에서 데이터를 받기 위한 훅

#### isFetching과 isLoading의 차이

- isFetching
  - 비동기 쿼리가 아직 해결되지 않았음을 의미
  - 즉, fetch가 완료되지 않았지만, Axios 호출과 같은 다른 종류의 데이터를 가져오는 작업일 경우가 있다.
- isLoading
  - 그의 하위 집합으로 로딩 중 이라는 것을 의미
  - 쿼리 함수가 아직 미해결이지만, 캐시된 데이터도 없다.
  - 이 쿼리를 전에 실행한 적이 없어서 데이터를 가져오는 중..

#### staleTime과 gcTime의 차이

- staleTime
  - 데이터를 다시 가져와야 할 때를 알려줌
- gcTime (=garbage collected)
  - 데이터를 캐시에 유지할 시간을 결정
  - 기본 시간은 5분 (데이터가 페이지에 표시된 후부터 시간이 측정)
  - gcTiem이 지나면 캐시에서 데이터가 삭제됨
