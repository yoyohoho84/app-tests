import React, { useState, useEffect } from "react";

import {
  Panel,
  PanelHeader,
  Button,
  Div,
  Group,
  Header,
  Cell,
} from "@vkontakte/vkui";

import { addGroup } from "../bridge-method";

const DefaultPanel = ({
  id,
  go,
  openAlertPay,
  setActivePanel,
  snackbar,
  getPlatform,
  fetchedUser,
  getGroupId,
}) => {
  // useEffect(() => {
  //   addGroup(true, openAlertPay);
  // },[])

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <>
            {fetchedUser && (
              <>
                {[441494361, 73606509].includes(fetchedUser.id) ? (
                  <Button
                    onClick={() => setActivePanel("admin-panel")}
                    style={{
                      width: "150px",
                      height: "30px",
                      backgroundColor: "#165df5",
                      borderRadius: "15px",
                      marginLeft: "10px",
                    }}
                  >
                    Админ панель
                  </Button>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        }
      ></PanelHeader>
      <Div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        {getPlatform === "web" ? (
          <Div
            style={{
              fontWeight: "bold",
              fontSize: "25px",
              margin: "0px 10px 0px 10px",
            }}
          >
            Хотите подписаться на наше сообщество?
          </Div>
        ) : (
          <>
            <Div
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                margin: "0px 10px 0px 10px",
              }}
            >
              Хотите подписаться на
            </Div>
            <Div
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                margin: "0px 10px 0px 10px",
              }}
            >
              наше сообщество?
            </Div>
          </>
        )}

        <Button
          onClick={() => addGroup(openAlertPay, setActivePanel, getGroupId)}
          style={{
            width: "200px",
            height: "80px",
            backgroundColor: "#165df5",
            marginTop: "50px",
            borderRadius: "45px",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "20px",
            }}
          >
            Подписаться
          </span>
        </Button>
      </Div>
      {snackbar}
    </Panel>
  );
};

export { DefaultPanel };
