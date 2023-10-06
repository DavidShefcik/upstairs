import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

export enum NotificationType {
  Login = "LOGIN",
  AccountWelcome = "ACCOUNT_WELCOME",
  PostReceivedLiked = "POST_RECEIVED_LIKED",
  PostReceivedComment = "POST_RECEIVED_COMMENT",
  CommentReceivedLike = "COMMENT_RECEIVED_LIKED",
  CommentReceivedComment = "COMMENT_RECEIVED_COMMENT",
}
export type Notification = {
  text: string;
  date: string;
  type: NotificationType;
  id: string;
  isNew: boolean;
};
type NotificationMap = Map<string, Notification>;
export type INotificationStateContext = {
  notifications: NotificationMap;
  hasUnreadNotifications: boolean;
  addNotification(notification: Notification): void;
  dismissNotification(notificationId: string): void;
};

export const NotificationStateContext =
  createContext<INotificationStateContext>({
    notifications: new Map(),
    hasUnreadNotifications: false,
    addNotification: () => {},
    dismissNotification: () => {},
  });

export function NotificationStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationMap>(
    new Map(
      new Array(10).fill(0).map(() => {
        const id = faker.string.uuid();

        return [
          id,
          {
            date: faker.date.past().toISOString(),
            id,
            text: faker.lorem.sentence(),
            type: NotificationType.PostReceivedComment,
            isNew: Math.random() >= 0.4,
            url: ["/"],
          },
        ];
      })
    )
  );
  const hasUnreadNotifications = useMemo<boolean>(() => {
    for (const value of notifications.values()) {
      if (value.isNew) {
        return true;
      }
    }

    return false;
  }, [notifications]);

  const addNotification = (notification: Notification) => {
    setNotifications((oldValue) => {
      oldValue?.set(notification.id, notification);

      return oldValue;
    });
  };
  const dismissNotification = (notificationId: string) => {
    setNotifications((oldValue) => {
      oldValue?.delete(notificationId);

      return oldValue;
    });
  };

  return (
    <NotificationStateContext.Provider
      value={{
        addNotification,
        dismissNotification,
        notifications,
        hasUnreadNotifications,
      }}
    >
      {children}
    </NotificationStateContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationStateContext);
