// @ts-nocheck
import { useState } from "react";
import PassportCanvas from "./components/PassportCanvas/PassportCanvas";
export interface PassportData {
  name: string | undefined;
  birthDay: string | undefined;
  issueDay: string | undefined;
  rank: string | undefined;
  nickname: string | undefined;
  passportCode: string | undefined;
  passportImage: File | undefined | null;
}
function App() {
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();
  const [issueDay, setIssueDay] = useState();
  const [rank, setRank] = useState();
  const [nickname, setNickname] = useState();
  const [passportCode, setPassportCode] = useState();
  const [passportImage, setPassportImage] = useState(null);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };
  const handleIssueDayChange = (event) => {
    setIssueDay(event.target.value);
  };
  const handleRankChange = (event) => {
    setRank(event.target.value);
  };
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };
  const handlePassportCodeChange = (event) => {
    setPassportCode(event.target.value);
  };
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPassportImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleFormSubmit = () => {};
  return (
    <div className=" grid grid-cols-2 ">
      <fieldset
        className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box h-fit"
        onSubmit={handleFormSubmit}
      >
        <legend className="fieldset-legend font-joystix">
          Данные для паспорта
        </legend>

        <label className="fieldset-label font-joystix">Имя</label>
        <input
          type="text"
          value={name}
          className="input font-determination"
          placeholder="Kuzma fon Bismark"
          onChange={handleNameChange}
        />

        <label className="fieldset-label font-joystix">День рождение</label>
        <input
          value={birthday}
          type="text"
          className="input font-determination"
          placeholder="03.01.1895"
          onChange={handleBirthdayChange}
        />

        <label className="fieldset-label font-joystix">Когда выдан</label>
        <input
          value={issueDay}
          type="text"
          className="input font-determination"
          placeholder="12.03.2025"
          onChange={handleIssueDayChange}
        />

        <label className="fieldset-label font-joystix">Звание</label>
        <div className="join">
          <input
            value={rank}
            type="text"
            className="input font-determination"
            placeholder="Kancler"
            onChange={handleRankChange}
          />
          <button className="btn btn-neutral" onClick={() => setRank("житель")}>
            Вставка
          </button>
        </div>

        <label className="fieldset-label font-joystix">Ник игрока</label>
        <input
          value={nickname}
          type="text"
          className="input font-determination"
          placeholder="Aguilam"
          onChange={handleNicknameChange}
        />

        <label className="fieldset-label font-joystix">Код паспорта</label>
        <input
          value={passportCode}
          type="text"
          className="input font-determination"
          placeholder="LOREM-IPSUM"
          onChange={handlePassportCodeChange}
        />

        <label className="fieldset-label font-joystix">Фото на паспорт</label>
        <input type="file" className="file-input" onChange={handleFileChange} />
      </fieldset>
      <PassportCanvas
        name={name}
        nickname={nickname}
        birthDay={birthday}
        issueDay={issueDay}
        rank={rank}
        passportCode={passportCode}
        passportImage={passportImage}
      />
    </div>
  );
}

export default App;
