import { NextPage } from 'next';
import Head from 'next/head';
import { FormEventHandler, useState } from 'react';
import QRCode from 'qrcode';
import styled, { keyframes } from 'styled-components';

const QrPage: NextPage<{}> = () => {
  const [inputText, setInputText] = useState('');

  const [error, setError] = useState('');

  const [svgText, setSvgText] = useState('');
  const [qrCodeElement, setQrCodeElement] = useState<HTMLCanvasElement>();

  const generateQR: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setQrCodeElement(undefined);

    QRCode.toCanvas(
      inputText,
      { errorCorrectionLevel: 'H' },
      (error, canvas) => {
        if (error) {
          setError(error.message);
        }
        setQrCodeElement(canvas);
      }
    );

    QRCode.toString(
      inputText,
      {
        type: 'svg',
        errorCorrectionLevel: 'H',
        width: 400,
        margin: 0,
        scale: 4
      },
      (error, string) => {
        if (error) {
          setError(error.message);
        }
        setSvgText(`data:image/svg+xml,${encodeURIComponent(string)}`);
      }
    );
  };
  return (
    <Wrapper>
      <Head>
        <title>QR Code Generator</title>
      </Head>
      <ContentWrapper>
        <Form onSubmit={generateQR}>
          <label htmlFor="qr-text" className="visually-hidden">
            QR Contents
          </label>
          <Input
            name="qr-text"
            id="qr-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <CreateButton type="submit">Create QR Code</CreateButton>
        </Form>
        {error && <div>{error}</div>}
        {qrCodeElement && (
          <QRCodeWrapper>
            <img src={qrCodeElement.toDataURL()} alt="QR Code" />
            <a href={svgText} download="qr.svg">
              Download svg
            </a>
          </QRCodeWrapper>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default QrPage;

const Wrapper = styled.div`
  font-family: 'Nunito', sans-serif;
  background-color: #222;
  height: 100%;
  padding-top: 12rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 48rem;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 3rem;
  font-size: 2rem;
  border-radius: 0.5rem;
  border: none;
  text-align: center;
  width: 100%;
`;

const animate = keyframes`
 0% {
    filter: blur(20px) hue-rotate(0deg) saturate(100%);
    transform: scale(1.2) rotate(-3deg);
  }
  12.5% {
    filter: blur(20px) hue-rotate(90deg) saturate(135%);
    transform: scale(1.3) rotate(1.5deg);
  }
  16.66% {
    filter: blur(20px) hue-rotate(119.952deg) saturate(147%);
    transform: scale(1.27) rotate(3deg);
  }
  25% {
    filter: blur(20px) hue-rotate(180deg) saturate(170%);
    transform: scale(1.2) rotate(0deg);
  }
  33.3% {
    filter: blur(20px) hue-rotate(239.76deg) saturate(147%);
    transform: scale(1.27) rotate(-3deg);
  }
  37.5% {
    filter: blur(20px) hue-rotate(270deg) saturate(135%);
    transform: scale(1.3) rotate(-1.5deg);
  }
  50% {
    filter: blur(20px) hue-rotate(360deg) saturate(100%);
    transform: scale(1.2) rotate(3deg);
  }
  62.5% {
    filter: blur(20px) hue-rotate(450deg) saturate(135%);
    transform: scale(1.3) rotate(-1.5deg);
  }
  66.6% {
    filter: blur(20px) hue-rotate(479.52deg) saturate(147%);
    transform: scale(1.27) rotate(-3deg);
  }
  75% {
    filter: blur(20px) hue-rotate(540deg) saturate(170%);
    transform: scale(1.2) rotate(0deg);
  }
  83.3% {
    filter: blur(20px) hue-rotate(599.76deg) saturate(147%);
    transform: scale(1.27) rotate(3deg);
  }
  87.5% {
    filter: blur(20px) hue-rotate(630deg) saturate(135%);
    transform: scale(1.3) rotate(1.5deg);
  }
  100% {
    filter: blur(20px) hue-rotate(720deg) saturate(100%);
    transform: scale(1.2) rotate(-3deg);
  }
`;

const CreateButton = styled.button`
  --blur: '20px';
  position: relative;
  width: 16.875rem;
  height: 3.125rem;
  background-color: white;
  font-size: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  z-index: 1;

  &:before {
    content: '';
    background: conic-gradient(
      hsl(0, 100%, 50%) 0deg,
      hsl(22.5, 100%, 50%) 61deg,
      hsl(45, 100%, 50%) 75deg,
      hsl(67.5, 100%, 50%) 80deg,
      hsl(90, 100%, 50%) 100deg,
      hsl(112.5, 100%, 50%) 105deg,
      hsl(135, 100%, 50%) 151deg,
      hsl(157.5, 100%, 50%) 180deg,
      hsl(180, 100%, 50%) 241deg,
      hsl(202.5, 100%, 50%) 255deg,
      hsl(225, 100%, 50%) 260deg,
      hsl(247.5, 100%, 50%) 280deg,
      hsl(270, 100%, 50%) 285deg,
      hsl(292.5, 100%, 50%) 299deg,
      hsl(0, 100%, 50%) 360deg
    );
    position: absolute;
    top: 0px;
    left: 0px;
    transform: scale(1.2) rotate(-4deg);
    filter: blur(var(--blur)) hue-rotate(0deg);
    animation: ${animate} 30s linear infinite;

    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: -1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: white;
    z-index: -1;
  border-radius: 0.5rem;
  }
`;

const QRCodeWrapper = styled.div`
  max-width: 32rem;
`;
