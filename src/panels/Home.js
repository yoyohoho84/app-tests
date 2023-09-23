import React from "react";

import {
  Panel,
  PanelHeader,
  Button,
  Div,
  Group,
  FormItem,
  NativeSelect,
} from "@vkontakte/vkui";

const Home = ({ id, go, getRandomImg, setIMGresult, setActivePanel }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Узнай какой ты хряк</PanelHeader>
      <Group>
        <FormItem top="Вы любите сало?">
          <NativeSelect>
            <option value="yes">Не выбрано</option>
            <option value="yes">Да</option>
            <option value="no">Нет</option>
          </NativeSelect>
        </FormItem>
        <FormItem top="Вы имеете избыточный вес?">
          <NativeSelect>
            <option value="yes">Не выбрано</option>
            <option value="yes">Да</option>
            <option value="no">Нет</option>
          </NativeSelect>
        </FormItem>
        <FormItem top="Вы любите Украину?">
          <NativeSelect>
            <option value="yes">Не выбрано</option>
            <option value="yes">Да</option>
            <option value="no">Нет</option>
          </NativeSelect>
        </FormItem>
        <FormItem top="Вы считаете себя чувствительной натурой?">
          <NativeSelect>
            <option value="yes">Не выбрано</option>
            <option value="yes">Да</option>
            <option value="no">Нет</option>
          </NativeSelect>
        </FormItem>

        <FormItem>
          <Button
            onClick={() => {
              getRandomImg(0, 15);
              setActivePanel("result-panel");
            }}
            stretched
            style={{
              //   width: "200px",
              height: "60px",
              backgroundColor: "#165df5",
              marginTop: "5px",
              borderRadius: "10px",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "20px",
              }}
            >
              Узнать результат
            </span>
          </Button>
        </FormItem>
      </Group>
    </Panel>
  );
};

export { Home };
