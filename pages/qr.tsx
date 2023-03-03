import { NextPage } from 'next';
import Head from 'next/head';
import { FormEventHandler, useState } from 'react';
import QRCode from 'qrcode';
import styled, { css, keyframes } from 'styled-components';

const QrPage: NextPage<{}> = () => {
  const [inputText, setInputText] = useState('');

  const [error, setError] = useState('');

  const [svgText, setSvgText] = useState('');
  const [pngText, setPngText] = useState('');
  const [qrCodeElement, setQrCodeElement] = useState<HTMLCanvasElement>();

  const generateQR: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setQrCodeElement(undefined);

    QRCode.toCanvas(
      inputText,
      { errorCorrectionLevel: 'H', width: 400, margin: 0 },
      (error, canvas) => {
        if (error) {
          setError(error.message);
        }
        setQrCodeElement(canvas);
      }
    );

    QRCode.toDataURL(
      inputText,
      { errorCorrectionLevel: 'H', width: 400, margin: 3 },
      (error, string) => {
        if (error) {
          setError(error.message);
        }
        setPngText(string);
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
    <Wrapper qrShown={!!qrCodeElement}>
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
            autoFocus
          />
          <CreateButton type="submit">Create QR Code</CreateButton>
        </Form>
        {error && <div>{error}</div>}
        {qrCodeElement && (
          <>
            <QRCodeWrapper>
              <img src={qrCodeElement.toDataURL()} alt="QR Code" />
            </QRCodeWrapper>
            <LinkWrapper>
              <DownloadLink href={svgText} download="qr.svg">
                Download svg
              </DownloadLink>
              <DownloadLink href={pngText} download="qr.png">
                Download png
              </DownloadLink>
            </LinkWrapper>
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default QrPage;

interface WrapperProps {
  readonly qrShown: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  --scaling-factor: 4;
  --border-radius: 0.5rem;
  --blur: calc(var(--scaling-factor) * 5px);

  @media (max-width: 480px) {
    --scaling-factor: 3;
  }
  @media (max-width: 480px) {
    --scaling-factor: 3;
  }

  font-family: 'Nunito', sans-serif;
  background-color: #050316;
  height: 100%;
  padding-top: calc(var(--scaling-factor) * 3rem);
  transition: padding-top 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${(props) =>
    props.qrShown &&
    css`
      padding-top: calc(var(--scaling-factor) * 1rem);
    `};
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
  margin-bottom: calc(var(--scaling-factor) * 1rem);
`;

const Input = styled.input`
  margin-bottom: calc(var(--scaling-factor) * 1rem);
  font-size: calc(var(--scaling-factor) * 0.5rem);
  border-radius: var(--border-radius);
  border: none;
  text-align: center;
  width: 100%;

  box-shadow: 0 0 calc(var(--scaling-factor) * 0.75rem) rgba(116, 203, 255, 0.3);
  transition: box-shadow 0.3s;

  &:focus {
    box-shadow: 0 0 calc(var(--scaling-factor) * 0.75rem) rgba(116, 203, 255, 1);
  }
`;

const animate = keyframes`
 0% {
    filter: blur(var(--blur)) hue-rotate(0deg) saturate(100%);
    transform: scale(1.2) rotate(-3deg);
  }
  12.5% {
    filter: blur(var(--blur)) hue-rotate(90deg) saturate(135%);
    transform: scale(1.3) rotate(1.5deg);
  }
  16.66% {
    filter: blur(var(--blur)) hue-rotate(119.952deg) saturate(147%);
    transform: scale(1.27) rotate(3deg);
  }
  25% {
    filter: blur(var(--blur)) hue-rotate(180deg) saturate(170%);
    transform: scale(1.2) rotate(0deg);
  }
  33.3% {
    filter: blur(var(--blur)) hue-rotate(239.76deg) saturate(147%);
    transform: scale(1.27) rotate(-3deg);
  }
  37.5% {
    filter: blur(var(--blur)) hue-rotate(270deg) saturate(135%);
    transform: scale(1.3) rotate(-1.5deg);
  }
  50% {
    filter: blur(var(--blur)) hue-rotate(360deg) saturate(100%);
    transform: scale(1.2) rotate(3deg);
  }
  62.5% {
    filter: blur(var(--blur)) hue-rotate(450deg) saturate(135%);
    transform: scale(1.3) rotate(-1.5deg);
  }
  66.6% {
    filter: blur(var(--blur)) hue-rotate(479.52deg) saturate(147%);
    transform: scale(1.27) rotate(-3deg);
  }
  75% {
    filter: blur(var(--blur)) hue-rotate(540deg) saturate(170%);
    transform: scale(1.2) rotate(0deg);
  }
  83.3% {
    filter: blur(var(--blur)) hue-rotate(599.76deg) saturate(147%);
    transform: scale(1.27) rotate(3deg);
  }
  87.5% {
    filter: blur(var(--blur)) hue-rotate(630deg) saturate(135%);
    transform: scale(1.3) rotate(1.5deg);
  }
  100% {
    filter: blur(var(--blur)) hue-rotate(720deg) saturate(100%);
    transform: scale(1.2) rotate(-3deg);
  }
`;

const CreateButton = styled.button`
  position: relative;
  width: calc(var(--scaling-factor) * 4.25rem);
  height: calc(var(--scaling-factor) * 0.75rem);
  background-color: white;
  font-size: calc(var(--scaling-factor) * 0.375rem);
  border: none;
  border-radius: var(--border-radius);
  z-index: 1;
  color: black;

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
    border-radius: var(--border-radius);
  }
`;

const QRCodeWrapper = styled.div`
  max-width: 16rem;
  padding: 1rem;
  background: white;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const DownloadLink = styled.a`
  display: block;
  background: white;
  border-radius: var(--border-radius);
  color: black;
  text-decoration: none;
  height: 2rem;
  display: flex;
  display: flex;
  align-items: center;
  padding: 1.2rem;
  font-size: calc(var(--scaling-factor) * 0.25rem);
`;
