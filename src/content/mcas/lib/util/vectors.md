# Vector Utils

## `a`

Makes an `Array` of `size`;

```ts
function a(size: number): number[];
```

## `distance`

[Euclidean distance function](https://en.wikipedia.org/wiki/Euclidean_distance):

```ts
function distance(v1: Vector2, v2: Vector2): number;
```

## `magnitude`

Gives the [magnitude](<https://en.wikipedia.org/wiki/Magnitude_(mathematics)#Euclidean_vector_space>) of a vector:

```ts
function magnitude(v: Vector2): number;
```

## `dot`

The [dot product](https://en.wikipedia.org/wiki/Dot_product) between two vectors:

```ts
function dot(u: Vector2, v: Vector2): number;
```

## `vectorSum`

Provides the sum of provided vectors:

```ts
function vectorSum(...vecs: Vector2[]): Vector2;
```

## `getLocalPos`

Translates an absolute position into a local position:

```ts
function getLocalPos(pos: Vector2, mod?: Vector2): Vector2;
```

The `mod` parameter allows you to modify the position of the returned position.
