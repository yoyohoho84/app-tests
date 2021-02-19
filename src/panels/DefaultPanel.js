import React from "react";

import {
  Panel,
  PanelHeader,
  Button,
  Div,
  Group,
  Header,
  Cell,
} from "@vkontakte/vkui";

const DefaultPanel = ({ id, go, fetchedUser }) => {
  return (
    <Panel id={id} separator={false}>
      <PanelHeader>Какой ты хряк</PanelHeader>;
      <Div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
          fontWeight: "bold",
          fontSize: "40px",
          //   width: "300px",
        }}
      >
        <Div>Хотите подписаться на наше сообщество?</Div>
        <Button
          style={{
            width: "200px",
            height: "80px",
            backgroundColor: "#165df5",
            marginTop: "50px",
            borderRadius: "45px",
          }}
        >
          Подписаться
        </Button>
      </Div>
    </Panel>
  );
};

export { DefaultPanel };
