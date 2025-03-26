# udemy-REACT-QUERY

Code to support the Udemy course [React Query: Server State Management in React](https://www.udemy.com/course/learn-react-query/?couponCode=REACT-QUERY-GITHUB)

## useQueryClient

QueryClient를 반환하고, 이 인스턴스를 통해 React Query의 **쿼리 캐시를 직접 조작**할 수 있다.

```typescript
import { useQueryClient } from '@tanstack/react-query';

const MyComponent = () => {
  const queryClient = useQueryClient();

  // QueryClient 인스턴스를 통해 다양한 작업 수행 가능
  return <div>MyComponent</div>;
};
```

**언제 사용할까?**

- useQuery 또는 useMutation을 사용하면서 데이터를 갱신해야 하는 경우
- 사용자의 액션(버튼 클릭 등)에 따라 쿼리 데이터를 즉시 변경해야 하는 경우
- 페이지 이동 전에 데이터를 미리 불러와서 UX를 개선하고 싶은 경우
- 쿼리 데이터를 완전히 삭제해야 하는 경우

### 주요 기능

#### 1. 쿼리 무효화 (invalidateQueries)

특정 키에 해당하는 데이터를 최신 상태로 갱신하고 싶을 때 사용
React Query는 기본적으로 **자동 리패치** 기능이 있지만, 수동으로 데이터를 최신화 해야하는 경우 **invalidateQueries**를 호출하면 된다.

```typescript
import { useQueryClient } from '@tanstack/react-query';

const MyComponent = () => {
  const queryClient = useQueryClient();

  const handleUpdate = async () => {
    // API 요청이 성공한 후 해당 쿼리 키를 가진 데이터를 무효화
    await fetch('/api/update-data', { method: 'POST' });

    queryClient.invalidateQueries({ queryKey: ['myData'] });
  };

  return <button onClick={handleUpdate}>Update Data</button>;
};
```

['myData'] 키를 가진 쿼리가 다시 패칭된다.

#### 2. 쿼리 데이터 직접 업데이트 (setQueryData)

쿼리를 다시 불러오지 않고 캐시된 데이터를 직접 변경 가능
즉, API 호출 없이 캐시에 저장된 데이터를 즉시 변경하는 방식이다.

```typescript
const handleUpdate = () => {
  queryClient.setQueryData(['myData'], (prevData: any) => {
    return { ...prevData, newValue: 'Updated!' };
  });
};
```

기존 preData를 받아와서 수정 후 저장

#### 3. 쿼리 데이터 미리 가져오기 (prefetchQuery)

컴포넌트가 마운트 되기 전에 데이터를 **미리 불러와서 저장**하고 싶을 때 사용
사용자가 특정 화면으로 이동할 가능성이 높은 경우, 데이터를 미리 패칭하여 UX 개선할 수 있다.

```typescript
const prefetchData = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['myData'],
    queryFn: () => fetch('/api/data').then((res) => res.json()),
  });
};
```

#### 4. 쿼리 제거 (removeQueries)

쿼리 데이터를 캐시에서 완전히 삭제할 때 사용

```typescript
queryClient.removeQueries({ queryKey: ['myData'] });
```
