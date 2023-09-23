import bridge from "@vkontakte/vk-bridge";
import {
  APP_ID,
  APP_IMG_SHARING_STORIES,
  APP_IMG_SHARING_WALL,
  USER_ID,
} from "../constants";

export function sharing(type, openAlertPay, e, urlSharing) {
  switch (type) {
    case "share-link":
      shareLink();
      break;
    case "copy-link":
      copyLink(openAlertPay);
      break;
    case "story":
      story(urlSharing);
      break;
    case "share-wall":
      share(e, urlSharing);
      break;
    default:
      break;
  }
}

function shareLink() {
  const link = `https://vk.com/app${APP_ID}`;
  bridge.send("VKWebAppShare", {
    link: link,
  });
}

// Копирование в буфер
function copyLink(openAlertPay) {
  const link = `https://vk.com/app${APP_ID}`;
  bridge
    .send("VKWebAppGetClientVersion")
    .then((result) => {
      console.log(result.platform);
      if (result.platform === "web" || result.platform === "mobile-web") {
        window.navigator.clipboard.writeText(link).then(
          () => {
            console.log("successfully set", link);
            openAlertPay("Ссылка скопирована");
          },
          () => {
            console.log("write failed", link);
          }
        );
      } else {
        bridge.send("VKWebAppCopyText", { text: link });
        openAlertPay("Ссылка скопирована");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}

//  Поделиться в истории
function story(urlSharing) {
  const url = `https://vk.com/app${APP_ID}#${USER_ID}`;

  bridge.send("VKWebAppShowStoryBox", {
    background_type: "image",
    url: urlSharing,
    attachment: {
      text: "go_to",
      type: "url",
      url: url,
    },
  });
}

//  ДОБАВЛЕНИЕ РЕПОСТА НА СТЕНУ ПОЛЬЗОВАТЕЛЯ
function share(e, urlSharing) {
  e.preventDefault();

  const url = `https://vk.com/app${APP_ID}`;
  const urlPhotoWall = `${urlSharing},https://vk.com/app${APP_ID}`;
  const text = `Узнай если не боишься! Приложение - ${url}`;

  bridge.send("VKWebAppShowWallPostBox", {
    message: text,
    attachments: urlPhotoWall,
  });
}
