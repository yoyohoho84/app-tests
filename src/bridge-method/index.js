import bridge from "@vkontakte/vk-bridge";
//constants
import { GROUP_ID } from "../constants";

// разрешение на отправку сообщений от имени группы
export function subscribeMessageFromGroup(openAlertPay, setActiveTab, groupId) {
  bridge
    .send("VKWebAppAllowMessagesFromGroup", {
      group_id: groupId,
    })
    .then((res) => {
      // console.log("subscribeMessageFromGroup result", res);
    })
    .catch((err) => {
      // console.log("subscribeMessageFromGroup result", err);

      setActiveTab("buy");
      openAlertPay(
        `Чтобы продолжить, разрешите отправку сообщений от имени группы`,
        "red"
      );
    });
}

// подписка на группу
export function addGroup(openAlertPay, setActivePanel, groupId) {
  console.log("add group");

  bridge
    .send("VKWebAppJoinGroup", { group_id: groupId })
    .then(({ result }) => {
      console.log("VKWebAppJoinGroup", result);
      if (result) {
        setActivePanel("home");
        openAlertPay("Вы уже подписаны на группу");
      }
    })
    .catch((err) => {
      openAlertPay("Подпишитесь на группу, чтобы продолжить", "red");
    });
}

// добавление сервиса в сообщество
export function AddToCommunity() {
  bridge
    .send("VKWebAppAddToCommunity", {})
    .then((res) => {
      if (res.group_id) {
        console.log("AddToCommunity res:", res.group_id);
        return true;
      }
    })
    .catch((err) => {
      console.log("AddToCommunity err:", err);
      return false;
    });
}

// открытие др приложение
export function goToApp(appID) {
  bridge.send("VKWebAppOpenApp", { app_id: appID, location: "GLI" });
}
