import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setEvents, addEvent, updateEvent } from "./slices";
import { Event } from "./types";

export const fetchEvents = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースからイベントを取得するコードを追加してください
      const events: Event[] = []; // 仮のデータ

      dispatch(setEvents(events));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const createEvent = (event: Event) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースにイベントを保存するコードを追加してください
      dispatch(addEvent(event));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const modifyEvent = (event: Event) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースのイベントを更新するコードを追加してください
      dispatch(updateEvent(event));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};

export const deleteEvent = (eventId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // データベースのイベントを削除するコードを追加してください
      const events: Event[] = []; // 仮のデータ
      dispatch(setEvents(events.filter((event) => event.event_id !== eventId)));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
};
