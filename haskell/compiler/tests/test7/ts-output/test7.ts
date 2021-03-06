/* @generated from adl module test7 */

import * as ADL from './runtime/adl';

export interface Point<T> {
  x: T;
  y: T;
}

export function makePoint<T>(
  input: {
    x: T,
    y: T,
  }
): Point<T> {
  return {
    x: input.x,
    y: input.y,
  };
}

const Point_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"struct_","value":{"typeParams":["T"],"fields":[{"annotations":[],"serializedName":"x","default":{"kind":"nothing"},"name":"x","typeExpr":{"typeRef":{"kind":"typeParam","value":"T"},"parameters":[]}},{"annotations":[],"serializedName":"y","default":{"kind":"nothing"},"name":"y","typeExpr":{"typeRef":{"kind":"typeParam","value":"T"},"parameters":[]}}]}},"name":"Point","version":{"kind":"nothing"}}};

export function texprPoint<T>(texprT : ADL.ATypeExpr<T>): ADL.ATypeExpr<Point<T>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Point"}}, parameters : [texprT.value]}};
}

export type Int1 = number;

const Int1_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"type_","value":{"typeParams":[],"typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}}},"name":"Int1","version":{"kind":"nothing"}}};

export function texprInt1(): ADL.ATypeExpr<Int1> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Int1"}}, parameters : []}};
}

export type Int2 = number;

const Int2_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":[],"default":{"kind":"nothing"},"typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}}},"name":"Int2","version":{"kind":"nothing"}}};

export function texprInt2(): ADL.ATypeExpr<Int2> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Int2"}}, parameters : []}};
}

export type Int3 = number;

const Int3_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":[],"default":{"kind":"just","value":42},"typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}}},"name":"Int3","version":{"kind":"nothing"}}};

export function texprInt3(): ADL.ATypeExpr<Int3> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Int3"}}, parameters : []}};
}

export type Int4<X> = number;

const Int4_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"type_","value":{"typeParams":["X"],"typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}}},"name":"Int4","version":{"kind":"nothing"}}};

export function texprInt4<X>(texprX : ADL.ATypeExpr<X>): ADL.ATypeExpr<Int4<X>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Int4"}}, parameters : [texprX.value]}};
}

export type Int5<X> = number;

const Int5_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":["X"],"default":{"kind":"nothing"},"typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}}},"name":"Int5","version":{"kind":"nothing"}}};

export function texprInt5<X>(texprX : ADL.ATypeExpr<X>): ADL.ATypeExpr<Int5<X>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Int5"}}, parameters : [texprX.value]}};
}

export type Int6<X> = number;

const Int6_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":["X"],"default":{"kind":"just","value":43},"typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}}},"name":"Int6","version":{"kind":"nothing"}}};

export function texprInt6<X>(texprX : ADL.ATypeExpr<X>): ADL.ATypeExpr<Int6<X>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Int6"}}, parameters : [texprX.value]}};
}

export type String1 = string;

const String1_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"type_","value":{"typeParams":[],"typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}}},"name":"String1","version":{"kind":"nothing"}}};

export function texprString1(): ADL.ATypeExpr<String1> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "String1"}}, parameters : []}};
}

export type String2 = string;

const String2_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":[],"default":{"kind":"nothing"},"typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}}},"name":"String2","version":{"kind":"nothing"}}};

export function texprString2(): ADL.ATypeExpr<String2> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "String2"}}, parameters : []}};
}

export type String3 = string;

const String3_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":[],"default":{"kind":"just","value":"hello"},"typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}}},"name":"String3","version":{"kind":"nothing"}}};

export function texprString3(): ADL.ATypeExpr<String3> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "String3"}}, parameters : []}};
}

export type String4<X> = string;

const String4_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"type_","value":{"typeParams":["X"],"typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}}},"name":"String4","version":{"kind":"nothing"}}};

export function texprString4<X>(texprX : ADL.ATypeExpr<X>): ADL.ATypeExpr<String4<X>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "String4"}}, parameters : [texprX.value]}};
}

export type String5<X> = string;

const String5_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":["X"],"default":{"kind":"nothing"},"typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}}},"name":"String5","version":{"kind":"nothing"}}};

export function texprString5<X>(texprX : ADL.ATypeExpr<X>): ADL.ATypeExpr<String5<X>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "String5"}}, parameters : [texprX.value]}};
}

export type String6<X> = string;

const String6_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":["X"],"default":{"kind":"just","value":"goodbye"},"typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}}},"name":"String6","version":{"kind":"nothing"}}};

export function texprString6<X>(texprX : ADL.ATypeExpr<X>): ADL.ATypeExpr<String6<X>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "String6"}}, parameters : [texprX.value]}};
}

export type IntPoint1 = Point<number>;

const IntPoint1_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"type_","value":{"typeParams":[],"typeExpr":{"typeRef":{"kind":"reference","value":{"moduleName":"test7","name":"Point"}},"parameters":[{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}]}}},"name":"IntPoint1","version":{"kind":"nothing"}}};

export function texprIntPoint1(): ADL.ATypeExpr<IntPoint1> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "IntPoint1"}}, parameters : []}};
}

export type IntPoint2 = Point<number>;

const IntPoint2_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":[],"default":{"kind":"nothing"},"typeExpr":{"typeRef":{"kind":"reference","value":{"moduleName":"test7","name":"Point"}},"parameters":[{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}]}}},"name":"IntPoint2","version":{"kind":"nothing"}}};

export function texprIntPoint2(): ADL.ATypeExpr<IntPoint2> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "IntPoint2"}}, parameters : []}};
}

export type IntPoint3 = Point<number>;

const IntPoint3_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":[],"default":{"kind":"just","value":{"x":5,"y":27}},"typeExpr":{"typeRef":{"kind":"reference","value":{"moduleName":"test7","name":"Point"}},"parameters":[{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}]}}},"name":"IntPoint3","version":{"kind":"nothing"}}};

export function texprIntPoint3(): ADL.ATypeExpr<IntPoint3> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "IntPoint3"}}, parameters : []}};
}

export type Point1<X> = Point<X>;

const Point1_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"type_","value":{"typeParams":["X"],"typeExpr":{"typeRef":{"kind":"reference","value":{"moduleName":"test7","name":"Point"}},"parameters":[{"typeRef":{"kind":"typeParam","value":"X"},"parameters":[]}]}}},"name":"Point1","version":{"kind":"nothing"}}};

export function texprPoint1<X>(texprX : ADL.ATypeExpr<X>): ADL.ATypeExpr<Point1<X>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Point1"}}, parameters : [texprX.value]}};
}

export type Point2<X> = Point<X>;

const Point2_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"newtype_","value":{"typeParams":["X"],"default":{"kind":"nothing"},"typeExpr":{"typeRef":{"kind":"reference","value":{"moduleName":"test7","name":"Point"}},"parameters":[{"typeRef":{"kind":"typeParam","value":"X"},"parameters":[]}]}}},"name":"Point2","version":{"kind":"nothing"}}};

export function texprPoint2<X>(texprX : ADL.ATypeExpr<X>): ADL.ATypeExpr<Point2<X>> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "Point2"}}, parameters : [texprX.value]}};
}

export type IntPoint1A = IntPoint1;

const IntPoint1A_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"type_","value":{"typeParams":[],"typeExpr":{"typeRef":{"kind":"reference","value":{"moduleName":"test7","name":"IntPoint1"}},"parameters":[]}}},"name":"IntPoint1A","version":{"kind":"nothing"}}};

export function texprIntPoint1A(): ADL.ATypeExpr<IntPoint1A> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "IntPoint1A"}}, parameters : []}};
}

export interface S {
  f1: IntPoint1A;
}

export function makeS(
  input: {
    f1: IntPoint1A,
  }
): S {
  return {
    f1: input.f1,
  };
}

const S_AST : ADL.ScopedDecl =
  {"moduleName":"test7","decl":{"annotations":[],"type_":{"kind":"struct_","value":{"typeParams":[],"fields":[{"annotations":[],"serializedName":"f1","default":{"kind":"nothing"},"name":"f1","typeExpr":{"typeRef":{"kind":"reference","value":{"moduleName":"test7","name":"IntPoint1A"}},"parameters":[]}}]}},"name":"S","version":{"kind":"nothing"}}};

export function texprS(): ADL.ATypeExpr<S> {
  return {value : {typeRef : {kind: "reference", value : {moduleName : "test7",name : "S"}}, parameters : []}};
}

export const _AST_MAP: { [key: string]: ADL.ScopedDecl } = {
  "test7.Point" : Point_AST,
  "test7.Int1" : Int1_AST,
  "test7.Int2" : Int2_AST,
  "test7.Int3" : Int3_AST,
  "test7.Int4" : Int4_AST,
  "test7.Int5" : Int5_AST,
  "test7.Int6" : Int6_AST,
  "test7.String1" : String1_AST,
  "test7.String2" : String2_AST,
  "test7.String3" : String3_AST,
  "test7.String4" : String4_AST,
  "test7.String5" : String5_AST,
  "test7.String6" : String6_AST,
  "test7.IntPoint1" : IntPoint1_AST,
  "test7.IntPoint2" : IntPoint2_AST,
  "test7.IntPoint3" : IntPoint3_AST,
  "test7.Point1" : Point1_AST,
  "test7.Point2" : Point2_AST,
  "test7.IntPoint1A" : IntPoint1A_AST,
  "test7.S" : S_AST
};
