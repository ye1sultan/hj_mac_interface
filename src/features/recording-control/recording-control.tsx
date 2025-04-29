import { Button } from "@/components/ui/button";
import { formatAnalysis } from "@/helpers/formatAnalysis";
import { IAnalysisData } from "@/types/analyze";
import { IPartialTranscript, ITranscript } from "@/types/transcript";
import { IconDownload, IconMicrophoneFilled } from "@tabler/icons-react";
import React, { useState } from "react";

interface RecordingControlProps {
  transcripts: ITranscript[];
  setTranscripts: React.Dispatch<React.SetStateAction<ITranscript[]>>;
  setAnalyzeData: React.Dispatch<React.SetStateAction<IAnalysisData | null>>;
}

export function RecordingControl({
  transcripts,
  setTranscripts,
  setAnalyzeData,
}: RecordingControlProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Нажмите 'Начать' для начала записи");
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [partialTranscript, setPartialTranscript] =
    useState<IPartialTranscript | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);

      const context = new AudioContext();
      setAudioContext(context);

      const ws = new WebSocket("wss://fc3b-77-240-47-29.ngrok-free.app/ws");

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "config",
            sampleRate: context.sampleRate,
          }),
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.error) {
            console.error("Server error:", data.error);

            if (
              data.error.includes("RST_STREAM") ||
              data.error.includes("StatusCode.INTERNAL")
            ) {
              console.log(
                "Detected recoverable gRPC error, continuing recognition",
              );
              setStatus("Распознавание продолжается...");
              return;
            }

            setStatus(`Ошибка: ${data.error}`);
            stopRecording();
            return;
          }

          if (data.alternatives && data.alternatives.length > 0) {
            if (data.type === "partial") {
              setStatus("Распознавание...");
              if (data.source === "user") {
                setPartialTranscript({
                  text: data.alternatives[0],
                  sender: data.source,
                });
              }
            } else if (data.type === "final") {
              const now = new Date();
              const timestamp = now.toLocaleTimeString("ru-RU", {
                hour12: false,
              });

              if (data.alternatives[0]?.trim()) {
                setTranscripts((prev) => [
                  ...prev,
                  {
                    timestamp,
                    text: data.alternatives[0],
                    sender: data.source,
                  },
                ]);
                if (data.source === "user") {
                  setPartialTranscript(null);
                }
                setStatus("Распознавание завершено");
              }
            } else if (data.type === "final_refinement") {
              if (data.alternatives[0]?.trim()) {
                setTranscripts((prev) => {
                  if (prev.length === 0) return prev;
                  const last = prev[prev.length - 1];

                  return [
                    ...prev.slice(0, -1),
                    {
                      ...last,
                      text: data.alternatives[0],
                      sender: data.source,
                    },
                  ];
                });
              }
            }
          }
        } catch (error) {
          console.error("Ошибка обработки сообщения:", error);
          setStatus(
            `Ошибка обработки сообщения: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
          );
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket ошибка:", error);
        setStatus("Ошибка соединения WebSocket");
      };

      ws.onclose = () => {
        console.log("WebSocket закрыт");
      };

      setWebSocket(ws);

      const audioInput = context.createMediaStreamSource(stream);
      const processor = context.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          const pcmData = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            pcmData[i] = Math.max(
              -32768,
              Math.min(32767, Math.round(inputData[i] * 32767)),
            );
          }

          const base64Data = arrayBufferToBase64(pcmData.buffer);
          ws.send(
            JSON.stringify({
              type: "audio",
              data: base64Data,
            }),
          );
        }
      };

      audioInput.connect(processor);
      processor.connect(context.destination);

      setStatus("Запись в процессе...");
      setIsRecording(true);
    } catch (error) {
      setStatus(
        `Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
      );
    }
  };

  const stopRecording = async () => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({ type: "stop" }));
      websocket.close();
    }

    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }

    if (audioContext) {
      await audioContext.close().catch(console.error);
    }

    setStatus("Запись остановлена");
    setIsRecording(false);

    if (transcripts.length === 0) {
      console.warn("Нет транскриптов для отправки на анализ");
      return;
    }

    const combinedText = transcripts
      .map((t) => `${t.sender === "system" ? "Sales" : "User"}: ${t.text}`)
      .join("\n\n");

    try {
      const response = await fetch(
        "https://017e-77-240-47-29.ngrok-free.app/api/v1/sales_analyst",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: combinedText,
          }),
        },
      );

      const result = await response.json();

      const formatted = formatAnalysis(result);

      setAnalyzeData(formatted);
      console.log("Результат анализа:", formatted);
    } catch (error) {
      console.error("Ошибка отправки на анализ:", error);
    }
  };

  const downloadTranscription = () => {
    if (transcripts.length === 0) {
      setStatus("Нет данных для сохранения");
      return;
    }

    const text = transcripts
      .map((t) => `[${t.timestamp}] (${t.sender}) ${t.text}`)
      .join("\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  {
    /* <div>{status}</div>

      {partialTranscript && (
        <div className="text-muted-foreground italic">
          {partialTranscript.text}
        </div>
      )} */
  }

  return (
    <div className="flex h-20 w-full items-center justify-center gap-4">
      {isRecording ? (
        <Button
          onClick={stopRecording}
          disabled={!isRecording}
          variant="link"
          size="icon"
          className="animate-pulse text-red-500"
        >
          <IconMicrophoneFilled size={42} />
        </Button>
      ) : (
        <Button
          onClick={startRecording}
          disabled={isRecording}
          variant="link"
          size="icon"
          className="text-blue-500"
        >
          <IconMicrophoneFilled size={42} />
        </Button>
      )}
      {!(isRecording || transcripts.length === 0) && (
        <Button
          onClick={downloadTranscription}
          variant="link"
          size="icon"
          className="text-blue-500"
        >
          <IconDownload size={42} />
        </Button>
      )}
    </div>
  );
}
