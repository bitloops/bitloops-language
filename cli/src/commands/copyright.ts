/**
 *  Bitloops Language CLI
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

const transpile = (): void => {
  console.log(
    'You can view our license information at: https://github.com/bitloops/bitloops-language-cli/blob/main/LICENSE',
  );
  console.log();
};

export const copyrightSnippet = `Bitloops Language - Copyright (C) 2022 Bitloops S.A.
This program comes with ABSOLUTELY NO WARRANTY; for details type \`bitloops-language copyright\`.
This is free software, and you are welcome to redistribute it
under certain conditions; type \`bitloops-language copyright\` for details.`;

export default transpile;
