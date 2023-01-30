# typescript parser proof of concept

## goal

This proof of concept demonstrates the ability to re-use the Typescript typechecker on an AST that was not generated by the typescript parser (but perhaps another parser altogether).

## setup

there are two programs `fake-parser` and `typescript-parser` that analyse the same program and use the typechecker to infer types of variables.
the `fake-parser` will do so based on an [AST](src/fake-parser/cat-dog.ts), the `typescript-parser` will do so based on a [source file](src/typescript-parser/cat-dog.ts).

Both programs analyse the same source code and print out the same variables.


## input
<details>
  <summary>click to reveal source code</summary>
  
  ``` typescript
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
  ```

</details>

## output

The output of either program is expected to be:
``` plain
before narrowing to either Cat or Dog
variable catName_0  has type error
variable dogName_0  has type error
variable age_0      has type number

after narrowing to Cat
variable catName_1  has type string
variable dogName_1  has type error
variable age_1      has type number

after narrowing to Dog
variable catName_2  has type error
variable dogName_2  has type string
variable age_2      has type number
```

## executing the test

from the root of this project, run the following two commands and compare the results
- `ts-node src/fake-parser/test.ts`
- `ts-node src/typescript-parser/test.ts`