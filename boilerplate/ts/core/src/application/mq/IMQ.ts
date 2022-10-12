/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
export interface IMQ<Connection> {
  initializeConnection(): Promise<Connection>;
  getConnection(): Promise<Connection>;
  closeConnection(): Promise<void>;
  gracefullyCloseConnection(): Promise<void>;
  publish(topic: string, message: Record<string, unknown> | string): Promise<void>;
  request<T>(topic: string, body: any): Promise<T>;
  subscribe(
    topic: string,
    callbackFunction?: (data: any, subject: string) => void,
    subscriptionGroup?: string,
  ): void;
}
