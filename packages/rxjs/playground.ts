import { interval, map, Observable, Observer, Subscription, take } from 'rxjs';

const observable = new Observable<number>((sub) => {
  try {
    sub.next(1);
    sub.next(2);
    sub.next(3);
    throw new Error("hello");

  } catch (error) {

  }

  sub.next(4);

  const timer = setTimeout(() => {
    console.log('observable complete')
    sub.complete();
  }, 1000);
  // throw new Error("world");

  return () => clearTimeout(timer)
});

const sub: Observer<number> = {
  next: console.log,
  complete: () => console.log('complete'),
  error: () => console.log('error happened')
};

const subscription: Subscription = observable.subscribe(sub);

subscription.unsubscribe();

const intervalObservable = interval(1000).pipe(map(() => Math.random()), take(4));
const intervalSubscription = intervalObservable.subscribe(sub);