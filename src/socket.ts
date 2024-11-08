import { io, Socket } from "socket.io-client";
import { ServerToClientEvents } from "../type";
import { EVENTS } from "./lib/constants";

const API_SOCKET_PATH = process.env.NEXT_PUBLIC_API_PRIVATE_SOCKET_URL ?? "";
class SocketService {
  private static instance: SocketService;
  private socket: Socket;

  private constructor(url: string = API_SOCKET_PATH) {
    this.socket = io(url, {
      transports: ["websocket"],
    });
  }

  static getInstance(url?: string): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService(url);
    }
    return SocketService.instance;
  }

  connectWithAuthToken(token: string) {
    this.socket.auth = { token };
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  checkConnect() {
    return this.socket.connected;
  }

  sendMessage(data: any) {
    this.socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, data);
  }

  joinRoom(roomId: any) {
    this.socket.emit(EVENTS.CLIENT.JOIN_ROOM, roomId);
  }

  joinRoomNotification(roomId: any) {
    this.socket.emit(EVENTS.CLIENT.JOIN_NOTIFICATION_IDENTIFY, roomId);
  }

  leaveRoom(roomId: any) {
    this.socket.emit("leave", roomId);
  }

  notifyTyping(roomId: number) {
    this.socket.emit("isTyping", roomId);
  }

  subscribeToMessages(messageHandler: ServerToClientEvents["message"]) {
    this.socket.on("message", messageHandler);
  }

  subscribeToTypingNotifications(
    typingNotificationsHandler: ServerToClientEvents["isTyping"],
  ) {
    this.socket.on("isTyping", typingNotificationsHandler);
  }

  on(event: string, handler: (...args: any[]) => void) {
    this.socket.on(event, handler);
  }

  off(event: string, handler: (...args: any[]) => void) {
    this.socket.off(event, handler);
  }

  get transport() {
    return this.socket.io.engine.transport.name;
  }

  onUpgrade(handler: (transport: any) => void) {
    this.socket.io.engine.on("upgrade", handler);
  }

  emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args);
  }
}

export const socketService = SocketService.getInstance();
