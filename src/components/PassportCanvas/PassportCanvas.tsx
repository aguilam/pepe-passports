import React, { useRef, useEffect } from "react";
import reichpass from "@/assets/images/reichpass.jpg";
import { PassportData } from "@/App";

const PassportCanvas: React.FC<PassportData> = React.memo(
  ({
    name = "Bismark fon Ukwerkh",
    nickname,
    birthDay = "13.10.1686",
    rank = "Канцлер",
    issueDay = "15.10.1978",
    passportCode,
    passportImage,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mainImg = new Image();
    mainImg.crossOrigin="anonymous"
    const overlayImg = new Image();
    const rankMassive = rank.split(/\s+/g);
    mainImg.src = reichpass;
    if (passportImage) {
      overlayImg.src = `${passportImage}`;
    } else {
      overlayImg.crossOrigin="anonymous"
      overlayImg.src = `http://localhost:3000/proxy/avatar/${nickname}`;
    }
    const drawImages = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.save();

      ctx.drawImage(mainImg, 0, 0, canvas.width, canvas.height);

      ctx.font = "48px Determination";
      ctx.fillStyle = "black";
      ctx.fillText(`${name}`, 22, 435);

      ctx.font = "26px Joystix";
      ctx.fillStyle = "#ede0d8";
      if (passportCode) {
        ctx.fillText(`${passportCode}`, 555, 645);
      } else {
        ctx.fillText(generateCode(), 555, 645);
      }

      ctx.font = "28px Joystix ";
      ctx.fillText(`${birthDay}`, 140, 473);
      ctx.fillText(`${issueDay}`, 170, 505);
      if (rankMassive) {
        ctx.fillText(`${rankMassive[0]}`, 140, 565);
        ctx.fillText(`${rankMassive[1] ? rankMassive[1] : ""}`, 45, 600);
        ctx.fillText(`${rankMassive[2] ? rankMassive[2] : ""}`, 45, 638);
      }
      if (nickname && !passportImage) {
        ctx.fillStyle = "#ede0d8";
        ctx.fillRect(599, 464, 148, 148);
        ctx.fill();
        ctx.filter = "grayscale(100%)";
        ctx.drawImage(overlayImg, 600, 465, 145, 145);
        ctx.filter = "none";
      } else {
        ctx.drawImage(overlayImg, 600, 465, 145, 145);
      }
    };
    useEffect(() => {
      mainImg.onload = () => {
        overlayImg.onload = () => {
          drawImages();
        };
      };
    }, []);

    const downloadImage = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = `${nickname}-passport.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    const generateCode = () => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let FirstCodePart = "";
      let SecondeCodePart = "";
      for (let i = 0; i < 5; i++) {
        FirstCodePart = FirstCodePart.concat(
          alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        );
        SecondeCodePart = SecondeCodePart.concat(
          alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        );
      }
      return `${FirstCodePart}-${SecondeCodePart}`;
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <canvas ref={canvasRef} width={830} height={665} />
        <button onClick={downloadImage} className="btn btn-outline btn-primary">
          Скачать изображение
        </button>
        <button className="btn btn-neutral mt-4 font-joystix" type="submit" onClick={drawImages}>
          Создать паспорт
        </button>
      </div>
    );
  }
);

export default PassportCanvas;
