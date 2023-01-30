const cloud: {
  CreateBucket: <T>() => Bucket<T>;
} = {} as any;

interface Bucket<T> {
  on_object_created(handler: (key: string, obj: T) => void);
}

enum Kind {
  Cat,
  Dog
}

interface Cat {
  kind: Kind.Cat;
  catName: string;
  age: number;
}

interface Dog {
  kind: Kind.Dog;
  dogName: string;
  age: number;
}

const bucket = cloud.CreateBucket<Cat | Dog>();
bucket.on_object_created((_key, obj) => {
  const catName_0 = obj.catName;
  const dogName_0 = obj.dogName;
  const age_0 = obj.age;

  if (obj.kind === Kind.Cat) {
    const catName_1 = obj.catName;
    const dogName_1 = obj.dogName;
    const age_1 = obj.age;
  } else {
    const catName_2 = obj.catName;
    const dogName_2 = obj.dogName;
    const age_2 = obj.age;
  }
});