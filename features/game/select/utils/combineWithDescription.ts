import { Difficult, Gender, Mode } from "@/types/interface";
import { difficultyDescriptions, genderDescriptions, modeDescriptions } from "../constants/descriptions";

export interface WithDescription {
  description: string;
}

export interface ModeWithDescription extends Mode, WithDescription {}
export interface DifficultWithDescription extends Difficult, WithDescription {}
export interface GenderWithDescription extends Gender, WithDescription {}

export function combineModeWithDescription(mode: Mode): ModeWithDescription {
  return {
    ...mode,
    description: modeDescriptions[mode.id] || "説明がありません。"
  };
}

export function combineDifficultWithDescription(difficult: Difficult): DifficultWithDescription {
  return {
    ...difficult,
    description: difficultyDescriptions[difficult.id] || "説明がありません。"
  };
}

export function combineGenderWithDescription(gender: Gender): GenderWithDescription {
  return {
    ...gender,
    description: genderDescriptions[gender.id] || "説明がありません。"
  };
}
