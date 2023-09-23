import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import {
  View,
  ScreenSpinner,
  TabbarItem,
  Epic,
  Div,
  Tabbar,
  ConfigProvider,
  ActionSheet,
  ActionSheetItem,
  Snackbar,
  Avatar,
  CellButton,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Icon16Done from "@vkontakte/icons/dist/16/done";
import Icon16Cancel from "@vkontakte/icons/dist/16/cancel";

import "./styles/reset.sass";
import "./styles/panels.sass";
import "./styles/img.sass";

//constants
import {
  APP_IMG_SHARING_STORIES,
  APP_IMG_SHARING_WALL,
  GROUP_ID,
} from "./constants";

import { sharing } from "./sharing-method";
import { nativeAds } from "./ads";
// import { AdminPanel } from "./panels/adminPanel";
import { Home, DefaultPanel, ResultPanel, AdminPanel } from "./panels";

window.globalURLSharing = {
  url: 0,
};

const App = () => {
  const [activePanel, setActivePanel] = useState("default-panel");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState();
  const [IMGresult, setIMGresult] = useState(null);
  const [urlSharing, setUrlSharing] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [getPlatform, setGetPlatform] = useState(null);
  const [getGroupId, setGetGroupId] = useState(GROUP_ID);
  const arrImgSharingWall = [];
  const arrImgSharingStories = [];

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();

    setTimeout(() => {
      nativeAds();
    }, 1000);
  }, []);-

  // получение группы с сервера
  useEffect(() => {
    axios
      .get("https://ods-studio.ru/hohol/get")
      .then(function (response) {
        console.log("get data", response);
        setGetGroupId(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    bridge
      .send("VKWebAppGetClientVersion")
      .then((result) => {
        setGetPlatform(result.platform);
        // getPlatform = result.platform;

        console.log("result.platform", getPlatform);
      })
      .catch((err) => console.log(err));
  }, [getPlatform]);

  function openAlertPay(text, backgroundColor = "green") {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        duration="12000"
        layout="horizontal"
        onClose={() => setSnackbar(null)}
        before={
          <Avatar size={24} style={{ backgroundColor }}>
            {backgroundColor === "green" ? (
              <Icon16Done fill="#fff" width={14} height={14} />
            ) : (
              <Icon16Cancel fill="#fff" width={14} height={14} />
            )}
          </Avatar>
        }
      >
        {text}
      </Snackbar>
    );
  }

  function openBase() {
    setActiveModal(null);
    setPopout(
      <>
        <ActionSheet onClose={() => setPopout(null)}>
          <ActionSheetItem
            autoclose
            onClick={() =>
              sharing(
                "share-link",
                null,
                null,
                APP_IMG_SHARING_WALL[globalURLSharing.url]
              )
            }
          >
            Поделиться ссылкой
          </ActionSheetItem>
          <ActionSheetItem
            autoclose
            onClick={() =>
              sharing(
                "copy-link",
                openAlertPay,
                null,
                APP_IMG_SHARING_WALL[globalURLSharing.url]
              )
            }
          >
            Скопировать ссылку
          </ActionSheetItem>
          <ActionSheetItem
            autoclose
            onClick={() =>
              sharing(
                "story",
                null,
                null,
                APP_IMG_SHARING_STORIES[globalURLSharing.url]
              )
            }
          >
            Поделиться в истории
          </ActionSheetItem>
          <ActionSheetItem
            autoclose
            onClick={(e) =>
              sharing(
                "share-wall",
                null,
                e,
                APP_IMG_SHARING_WALL[globalURLSharing.url]
              )
            }
          >
            Поделиться на стене
          </ActionSheetItem>
        </ActionSheet>
      </>
    );
  }

  function getRandomImg(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается

    globalURLSharing.url = result;
    // setUrlSharing(result);
    setIMGresult(<Div className={`icon${result}`}></Div>);
    console.log({
      linkWall: APP_IMG_SHARING_WALL[result],
      linkStories: APP_IMG_SHARING_STORIES[result],
      result: result,
      IMGresult: <Div className={`icon${result}`}></Div>,
    });
  }

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider isWebView={true}>
      <View activePanel={activePanel} popout={popout} modal={activeModal}>
        <Home
          id="home"
          fetchedUser={fetchedUser}
          go={go}
          setIMGresult={setIMGresult}
          getRandomImg={getRandomImg}
          setActivePanel={setActivePanel}
        />
        <DefaultPanel
          id="default-panel"
          fetchedUser={fetchedUser}
          go={go}
          openAlertPay={openAlertPay}
          setActivePanel={setActivePanel}
          snackbar={snackbar}
          getPlatform={getPlatform}
          getGroupId={getGroupId}
        />
        <ResultPanel
          id="result-panel"
          fetchedUser={fetchedUser}
          go={go}
          IMGresult={IMGresult}
          urlSharing={urlSharing}
          openBase={openBase}
        />
        <AdminPanel
          id="admin-panel"
          fetchedUser={fetchedUser}
          go={go}
          openAlertPay={openAlertPay}
          snackbar={snackbar}
          getGroupId={getGroupId}
        />
      </View>
    </ConfigProvider>
  );
};

export default App;
