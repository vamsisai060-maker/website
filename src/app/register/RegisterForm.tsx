'use client';

import { Suspense, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

const CHECK = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDEyIiB3aWR0aD0iMTYiIGhlaWdodD0iMTIiPjxwYXRoICBkPSJtMS40IDUuMmMtMC4zIDAtMC41IDAuMi0wLjQgMC40bDEuMyAzLjZjMC40IDEuMSAxLjQgMS44IDIuOSAxLjhoMi42YzEgMCAxLjEtMC4xIDEuMS0xdi0wLjljMC0wLjkgMC4xLTEgMS4yLTFoMS40YzEgMCAxLjEtMC4xIDEuNS0wLjlsMi01LjhjMC4xLTAuMi0wLjEtMC40LTAuNC0wLjRoLTIuOWMtMC4xIDAtMC4zIDAuMS0wLjMgMC4ybC0yLjEgNmMtMC4zIDAuOC0wLjUgMC45LTEuNSAwLjloLTEuMWMtMSAwLTEuMi0wLjEtMS41LTAuOWwtMC42LTEuOGMtMC4xLTAuMS0wLjItMC4yLTAuNC0wLjJ6Ii8+PC9zdmc+';
const STEP_ICONS = ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iODQiIHZpZXdCb3g9IjAgMCA2OSA4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9InBhdGgtMS1pbnNpZGUtMV8xNTA5XzE0MzciIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTUgODRDMC42OCA4NCAwLjIgODMuNTIgMC4yIDc5LjJWNzQuNEMwLjIgNzAuMDggMC42OCA2OS42IDUgNjkuNkgyM0MyNy4zMiA2OS42IDI3LjggNjkuMTIgMjcuOCA2NC44VjE5LjJDMjcuOCAxNC44OCAyNy4zMiAxNC40IDIzIDE0LjRINUMwLjY4IDE0LjQgMC4yIDEzLjkyIDAuMiA5LjZWNC44QzAuMiAwLjQ3OTk5NSAwLjY4IC01LjcyMjA1ZS0wNiA1IC01LjcyMjA1ZS0wNkgzMy44QzQwLjA0IC01LjcyMjA1ZS0wNiA0My40IDMuMzU5OTkgNDMuNCA5LjZWNjQuOEM0My40IDY5LjEyIDQzLjg4IDY5LjYgNDguMiA2OS42SDYzLjhDNjguMTIgNjkuNiA2OC42IDcwLjA4IDY4LjYgNzQuNFY3OS4yQzY4LjYgODMuNTIgNjguMTIgODQgNjMuOCA4NEg1WiIvPgo8L21hc2s+CjxwYXRoIGQ9Ik01IDgzQzMuOTIwOCA4MyAzLjE1NzE5IDgyLjk2ODYgMi41OTc0MSA4Mi44NzJDMi4wNDU1MyA4Mi43NzY5IDEuODExNDUgODIuNjM3MiAxLjY4NzExIDgyLjUxMjlDMS41NjI3NiA4Mi4zODg1IDEuNDIzMTEgODIuMTU0NSAxLjMyNzk2IDgxLjYwMjZDMS4yMzE0NSA4MS4wNDI4IDEuMiA4MC4yNzkyIDEuMiA3OS4ySC0wLjhDLTAuOCA4MC4yODA4IC0wLjc3MTQ0NiA4MS4xOTcyIC0wLjY0Mjk2IDgxLjk0MjRDLTAuNTEzMTExIDgyLjY5NTUgLTAuMjYyNzYzIDgzLjM5MTQgMC4yNzI4OTMgODMuOTI3MUMwLjgwODU0OSA4NC40NjI4IDEuNTA0NDcgODQuNzEzMSAyLjI1NzU5IDg0Ljg0M0MzLjAwMjgxIDg0Ljk3MTQgMy45MTkyIDg1IDUgODVWODNaTTEuMiA3OS4yVjc0LjRILTAuOFY3OS4ySDEuMlpNMS4yIDc0LjRDMS4yIDczLjMyMDggMS4yMzE0NSA3Mi41NTcyIDEuMzI3OTYgNzEuOTk3NEMxLjQyMzExIDcxLjQ0NTUgMS41NjI3NiA3MS4yMTE0IDEuNjg3MTEgNzEuMDg3MUMxLjgxMTQ1IDcwLjk2MjggMi4wNDU1MyA3MC44MjMxIDIuNTk3NDEgNzAuNzI4QzMuMTU3MTkgNzAuNjMxNCAzLjkyMDggNzAuNiA1IDcwLjZWNjguNkMzLjkxOTIgNjguNiAzLjAwMjgxIDY4LjYyODYgMi4yNTc1OSA2OC43NTdDMS41MDQ0NyA2OC44ODY5IDAuODA4NTQ5IDY5LjEzNzIgMC4yNzI4OTMgNjkuNjcyOUMtMC4yNjI3NjMgNzAuMjA4NSAtMC41MTMxMTEgNzAuOTA0NSAtMC42NDI5NiA3MS42NTc2Qy0wLjc3MTQ0NiA3Mi40MDI4IC0wLjggNzMuMzE5MiAtMC44IDc0LjRIMS4yWk01IDcwLjZIMjNWNjguNkg1VjcwLjZaTTIzIDcwLjZDMjQuMDgwOCA3MC42IDI0Ljk5NzIgNzAuNTcxNCAyNS43NDI0IDcwLjQ0M0MyNi40OTU1IDcwLjMxMzEgMjcuMTkxNSA3MC4wNjI4IDI3LjcyNzEgNjkuNTI3MUMyOC4yNjI4IDY4Ljk5MTQgMjguNTEzMSA2OC4yOTU1IDI4LjY0MyA2Ny41NDI0QzI4Ljc3MTUgNjYuNzk3MiAyOC44IDY1Ljg4MDggMjguOCA2NC44SDI2LjhDMjYuOCA2NS44NzkyIDI2Ljc2ODYgNjYuNjQyOCAyNi42NzIgNjcuMjAyNkMyNi41NzY5IDY3Ljc1NDUgMjYuNDM3MiA2Ny45ODg1IDI2LjMxMjkgNjguMTEyOUMyNi4xODg2IDY4LjIzNzIgMjUuOTU0NSA2OC4zNzY5IDI1LjQwMjYgNjguNDcyQzI0Ljg0MjggNjguNTY4NiAyNC4wNzkyIDY4LjYgMjMgNjguNlY3MC42Wk0yOC44IDY0LjhWMTkuMkgyNi44VjY0LjhIMjguOFpNMjguOCAxOS4yQzI4LjggMTguMTE5MiAyOC43NzE1IDE3LjIwMjggMjguNjQzIDE2LjQ1NzZDMjguNTEzMSAxNS43MDQ1IDI4LjI2MjggMTUuMDA4NSAyNy43MjcxIDE0LjQ3MjlDMjcuMTkxNSAxMy45MzcyIDI2LjQ5NTUgMTMuNjg2OSAyNS43NDI0IDEzLjU1N0MyNC45OTcyIDEzLjQyODUgMjQuMDgwOCAxMy40IDIzIDEzLjRWMTUuNEMyNC4wNzkyIDE1LjQgMjQuODQyOCAxNS40MzE0IDI1LjQwMjYgMTUuNTI4QzI1Ljk1NDUgMTUuNjIzMSAyNi4xODg1IDE1Ljc2MjggMjYuMzEyOSAxNS44ODcxQzI2LjQzNzIgMTYuMDExNCAyNi41NzY5IDE2LjI0NTUgMjYuNjcyIDE2Ljc5NzRDMjYuNzY4NiAxNy4zNTcyIDI2LjggMTguMTIwOCAyNi44IDE5LjJIMjguOFpNMjMgMTMuNEg1VjE1LjRIMjNWMTMuNFpNNSAxMy40QzMuOTIwOCAxMy40IDMuMTU3MTkgMTMuMzY4NSAyLjU5NzQxIDEzLjI3MkMyLjA0NTUzIDEzLjE3NjkgMS44MTE0NSAxMy4wMzcyIDEuNjg3MTEgMTIuOTEyOUMxLjU2Mjc2IDEyLjc4ODUgMS40MjMxMSAxMi41NTQ1IDEuMzI3OTYgMTIuMDAyNkMxLjIzMTQ1IDExLjQ0MjggMS4yIDEwLjY3OTIgMS4yIDkuNkgtMC44Qy0wLjggMTAuNjgwOCAtMC43NzE0NDYgMTEuNTk3MiAtMC42NDI5NiAxMi4zNDI0Qy0wLjUxMzExMSAxMy4wOTU1IC0wLjI2Mjc2MiAxMy43OTE0IDAuMjcyODk0IDE0LjMyNzFDMC44MDg1NSAxNC44NjI4IDEuNTA0NDcgMTUuMTEzMSAyLjI1NzU5IDE1LjI0M0MzLjAwMjgxIDE1LjM3MTQgMy45MTkyIDE1LjQgNSAxNS40VjEzLjRaTTEuMiA5LjZWNC44SC0wLjhWOS42SDEuMlpNMS4yIDQuOEMxLjIgMy43MjA4IDEuMjMxNDUgMi45NTcxOCAxLjMyNzk2IDIuMzk3NEMxLjQyMzExIDEuODQ1NTMgMS41NjI3NiAxLjYxMTQ1IDEuNjg3MTEgMS40ODcxQzEuODExNDUgMS4zNjI3NiAyLjA0NTUzIDEuMjIzMSAyLjU5NzQxIDEuMTI3OTVDMy4xNTcxOSAxLjAzMTQ0IDMuOTIwOCAwLjk5OTk5NCA1IDAuOTk5OTk0Vi0xLjAwMDAxQzMuOTE5MiAtMS4wMDAwMSAzLjAwMjgxIC0wLjk3MTQ1MiAyLjI1NzU5IC0wLjg0Mjk2NkMxLjUwNDQ3IC0wLjcxMzExNyAwLjgwODU0OSAtMC40NjI3NjggMC4yNzI4OTMgMC4wNzI4ODkzQy0wLjI2Mjc2MyAwLjYwODU0NSAtMC41MTMxMTEgMS4zMDQ0NiAtMC42NDI5NiAyLjA1NzU5Qy0wLjc3MTQ0NiAyLjgwMjgxIC0wLjggMy43MTkxOSAtMC44IDQuOEgxLjJaTTUgMC45OTk5OTRIMzMuOFYtMS4wMDAwMUg1VjAuOTk5OTk0Wk0zMy44IDAuOTk5OTk0QzM2Ljc0NzEgMC45OTk5OTQgMzguODU2OSAxLjc5MTExIDQwLjIzMjkgMy4xNjcxQzQxLjYwODkgNC41NDMwOSA0Mi40IDYuNjUyOTUgNDIuNCA5LjZINDQuNEM0NC40IDYuMzA3MDUgNDMuNTExMSAzLjYxNjkgNDEuNjQ3MSAxLjc1Mjg5QzM5Ljc4MzEgLTAuMTExMTIxIDM3LjA5MyAtMS4wMDAwMSAzMy44IC0xLjAwMDAxVjAuOTk5OTk0Wk00Mi40IDkuNlY2NC44SDQ0LjRWOS42SDQyLjRaTTQyLjQgNjQuOEM0Mi40IDY1Ljg4MDggNDIuNDI4NiA2Ni43OTcyIDQyLjU1NyA2Ny41NDI0QzQyLjY4NjkgNjguMjk1NSA0Mi45MzcyIDY4Ljk5MTQgNDMuNDcyOSA2OS41MjcxQzQ0LjAwODYgNzAuMDYyOCA0NC43MDQ1IDcwLjMxMzEgNDUuNDU3NiA3MC40NDNDNDYuMjAyOCA3MC41NzE0IDQ3LjExOTIgNzAuNiA0OC4yIDcwLjZWNjguNkM0Ny4xMjA4IDY4LjYgNDYuMzU3MiA2OC41Njg2IDQ1Ljc5NzQgNjguNDcyQzQ1LjI0NTUgNjguMzc2OSA0NS4wMTE1IDY4LjIzNzIgNDQuODg3MSA2OC4xMTI5QzQ0Ljc2MjggNjcuOTg4NSA0NC42MjMxIDY3Ljc1NDUgNDQuNTI4IDY3LjIwMjZDNDQuNDMxNCA2Ni42NDI4IDQ0LjQgNjUuODc5MiA0NC40IDY0LjhINDIuNFpNNDguMiA3MC42SDYzLjhWNjguNkg0OC4yVjcwLjZaTTYzLjggNzAuNkM2NC44NzkyIDcwLjYgNjUuNjQyOCA3MC42MzE0IDY2LjIwMjYgNzAuNzI4QzY2Ljc1NDUgNzAuODIzMSA2Ni45ODg2IDcwLjk2MjggNjcuMTEyOSA3MS4wODcxQzY3LjIzNzIgNzEuMjExNCA2Ny4zNzY5IDcxLjQ0NTUgNjcuNDcyIDcxLjk5NzRDNjcuNTY4NiA3Mi41NTcyIDY3LjYgNzMuMzIwOCA2Ny42IDc0LjRINjkuNkM2OS42IDczLjMxOTIgNjkuNTcxNCA3Mi40MDI4IDY5LjQ0MyA3MS42NTc2QzY5LjMxMzEgNzAuOTA0NSA2OS4wNjI4IDcwLjIwODUgNjguNTI3MSA2OS42NzI5QzY3Ljk5MTUgNjkuMTM3MiA2Ny4yOTU1IDY4Ljg4NjkgNjYuNTQyNCA2OC43NTdDNjUuNzk3MiA2OC42Mjg2IDY0Ljg4MDggNjguNiA2My44IDY4LjZWNzAuNlpNNjcuNiA3NC40Vjc5LjJINjkuNlY3NC40SDY3LjZaTTY3LjYgNzkuMkM2Ny42IDgwLjI3OTIgNjcuNTY4NiA4MS4wNDI4IDY3LjQ3MiA4MS42MDI2QzY3LjM3NjkgODIuMTU0NSA2Ny4yMzcyIDgyLjM4ODUgNjcuMTEyOSA4Mi41MTI5QzY2Ljk4ODYgODIuNjM3MiA2Ni43NTQ1IDgyLjc3NjkgNjYuMjAyNiA4Mi44NzJDNjUuNjQyOCA4Mi45Njg2IDY0Ljg3OTIgODMgNjMuOCA4M1Y4NUM2NC44ODA4IDg1IDY1Ljc5NzIgODQuOTcxNCA2Ni41NDI0IDg0Ljg0M0M2Ny4yOTU1IDg0LjcxMzEgNjcuOTkxNSA4NC40NjI4IDY4LjUyNzEgODMuOTI3MUM2OS4wNjI4IDgzLjM5MTQgNjkuMzEzMSA4Mi42OTU1IDY5LjQ0MyA4MS45NDI0QzY5LjU3MTQgODEuMTk3MiA2OS42IDgwLjI4MDggNjkuNiA3OS4ySDY3LjZaTTYzLjggODNINVY4NUg2My44VjgzWiIgZmlsbD0iIzYzNjM2MyIgbWFzaz0idXJsKCNwYXRoLTEtaW5zaWRlLTFfMTUwOV8xNDM3KSIvPgo8L3N2Zz4K', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzYiIGhlaWdodD0iODQiIHZpZXdCb3g9IjAgMCA3NiA4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9InBhdGgtMS1pbnNpZGUtMV8xNTA5XzMwMjkxNSIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNNjEuNCA0Ni44QzU3LjA4IDQ2LjggNTYuNiA0Ni4zMiA1Ni42IDQyVjE5LjJDNTYuNiAxNC44OCA1Ni4xMiAxNC40IDUxLjggMTQuNEg1QzAuNjggMTQuNCAwLjIgMTMuOTIgMC4yIDkuNlY0LjhDMC4yIDAuNDc5OTk1IDAuNjggLTUuNzIyMDVlLTA2IDUgLTUuNzIyMDVlLTA2SDQ3QzUzLjI0IC01LjcyMjA1ZS0wNiA1Ni42IDMuMzU5OTkgNTYuNiA5LjZDNTYuNiAxMy45MiA1Ny4wOCAxNC40IDYxLjQgMTQuNEg2Mi42QzY4Ljg0IDE0LjQgNzIuMiAxNy43NiA3Mi4yIDI0VjQyQzcyLjIgNDYuMzIgNzEuNzIgNDYuOCA2Ny40IDQ2LjhINjEuNFpNNS42IDYwLjEyTDguOTYgNDEuODhDOS42OCAzNy42OCAxMC4yOCAzNy4yIDE0LjYgMzcuMkgyMC42QzI0LjkyIDM3LjIgMjUuMjggMzcuNjggMjQuNTYgNDEuODhMMjAuMjQgNjQuOTJDMTkuNTIgNjkuMTIgMTkuODggNjkuNiAyNC4yIDY5LjZINzFDNzUuMzIgNjkuNiA3NS44IDcwLjA4IDc1LjggNzQuNFY3OS4yQzc1LjggODMuNTIgNzUuMzIgODQgNzEgODRIMjlDMjIuNzYgODQgMTkuNCA4MC42NCAxOS40IDc0LjRDMTkuNCA3MC4wOCAxOC45MiA2OS42IDE0LjYgNjkuNkgxMy40QzcuMTYgNjkuNiA0LjQgNjYuMjQgNS42IDYwLjEyWiIvPgo8L21hc2s+CjxwYXRoIGQ9Ik01LjYgNjAuMTJMNi41ODEzOCA2MC4zMTI0TDYuNTgzNDUgNjAuMzAxMkw1LjYgNjAuMTJaTTguOTYgNDEuODhMOS45NDM1MyA0Mi4wNjEyTDkuOTQ1NjIgNDIuMDQ5TDguOTYgNDEuODhaTTI0LjU2IDQxLjg4TDI1LjU0MjkgNDIuMDY0M0wyNS41NDQzIDQyLjA1NjZMMjUuNTQ1NiA0Mi4wNDlMMjQuNTYgNDEuODhaTTIwLjI0IDY0LjkyTDE5LjI1NzEgNjQuNzM1N0wxOS4yNTU3IDY0Ljc0MzRMMTkuMjU0NCA2NC43NTFMMjAuMjQgNjQuOTJaTTYxLjQgNDUuOEM2MC4zMjA4IDQ1LjggNTkuNTU3MiA0NS43Njg2IDU4Ljk5NzQgNDUuNjcyQzU4LjQ0NTUgNDUuNTc2OSA1OC4yMTE1IDQ1LjQzNzIgNTguMDg3MSA0NS4zMTI5QzU3Ljk2MjggNDUuMTg4NSA1Ny44MjMxIDQ0Ljk1NDUgNTcuNzI4IDQ0LjQwMjZDNTcuNjMxNCA0My44NDI4IDU3LjYgNDMuMDc5MiA1Ny42IDQySDU1LjZDNTUuNiA0My4wODA4IDU1LjYyODYgNDMuOTk3MiA1NS43NTcgNDQuNzQyNEM1NS44ODY5IDQ1LjQ5NTUgNTYuMTM3MiA0Ni4xOTE0IDU2LjY3MjkgNDYuNzI3MUM1Ny4yMDg2IDQ3LjI2MjggNTcuOTA0NSA0Ny41MTMxIDU4LjY1NzYgNDcuNjQzQzU5LjQwMjggNDcuNzcxNCA2MC4zMTkyIDQ3LjggNjEuNCA0Ny44VjQ1LjhaTTU3LjYgNDJWMTkuMkg1NS42VjQySDU3LjZaTTU3LjYgMTkuMkM1Ny42IDE4LjExOTIgNTcuNTcxNCAxNy4yMDI4IDU3LjQ0MyAxNi40NTc2QzU3LjMxMzEgMTUuNzA0NSA1Ny4wNjI4IDE1LjAwODUgNTYuNTI3MSAxNC40NzI5QzU1Ljk5MTUgMTMuOTM3MiA1NS4yOTU1IDEzLjY4NjkgNTQuNTQyNCAxMy41NTdDNTMuNzk3MiAxMy40Mjg1IDUyLjg4MDggMTMuNCA1MS44IDEzLjRWMTUuNEM1Mi44NzkyIDE1LjQgNTMuNjQyOCAxNS40MzE0IDU0LjIwMjYgMTUuNTI4QzU0Ljc1NDUgMTUuNjIzMSA1NC45ODg2IDE1Ljc2MjggNTUuMTEyOSAxNS44ODcxQzU1LjIzNzIgMTYuMDExNCA1NS4zNzY5IDE2LjI0NTUgNTUuNDcyIDE2Ljc5NzRDNTUuNTY4NiAxNy4zNTcyIDU1LjYgMTguMTIwOCA1NS42IDE5LjJINTcuNlpNNTEuOCAxMy40SDVWMTUuNEg1MS44VjEzLjRaTTUgMTMuNEMzLjkyMDggMTMuNCAzLjE1NzE5IDEzLjM2ODUgMi41OTc0MSAxMy4yNzJDMi4wNDU1MyAxMy4xNzY5IDEuODExNDUgMTMuMDM3MiAxLjY4NzExIDEyLjkxMjlDMS41NjI3NiAxMi43ODg1IDEuNDIzMTEgMTIuNTU0NSAxLjMyNzk2IDEyLjAwMjZDMS4yMzE0NSAxMS40NDI4IDEuMiAxMC42NzkyIDEuMiA5LjZILTAuOEMtMC44IDEwLjY4MDggLTAuNzcxNDQ2IDExLjU5NzIgLTAuNjQyOTYgMTIuMzQyNEMtMC41MTMxMTEgMTMuMDk1NSAtMC4yNjI3NjIgMTMuNzkxNCAwLjI3Mjg5NCAxNC4zMjcxQzAuODA4NTUgMTQuODYyOCAxLjUwNDQ3IDE1LjExMzEgMi4yNTc1OSAxNS4yNDNDMy4wMDI4MSAxNS4zNzE0IDMuOTE5MiAxNS40IDUgMTUuNFYxMy40Wk0xLjIgOS42VjQuOEgtMC44VjkuNkgxLjJaTTEuMiA0LjhDMS4yIDMuNzIwOCAxLjIzMTQ1IDIuOTU3MTggMS4zMjc5NiAyLjM5NzRDMS40MjMxMSAxLjg0NTUzIDEuNTYyNzYgMS42MTE0NSAxLjY4NzExIDEuNDg3MUMxLjgxMTQ1IDEuMzYyNzYgMi4wNDU1MyAxLjIyMzEgMi41OTc0MSAxLjEyNzk1QzMuMTU3MTkgMS4wMzE0NCAzLjkyMDggMC45OTk5OTQgNSAwLjk5OTk5NFYtMS4wMDAwMUMzLjkxOTIgLTEuMDAwMDEgMy4wMDI4MSAtMC45NzE0NTIgMi4yNTc1OSAtMC44NDI5NjZDMS41MDQ0NyAtMC43MTMxMTcgMC44MDg1NDkgLTAuNDYyNzY4IDAuMjcyODkzIDAuMDcyODg5M0MtMC4yNjI3NjMgMC42MDg1NDUgLTAuNTEzMTExIDEuMzA0NDYgLTAuNjQyOTYgMi4wNTc1OUMtMC43NzE0NDYgMi44MDI4MSAtMC44IDMuNzE5MTkgLTAuOCA0LjhIMS4yWk01IDAuOTk5OTk0SDQ3Vi0xLjAwMDAxSDVWMC45OTk5OTRaTTQ3IDAuOTk5OTk0QzQ5Ljk0NzEgMC45OTk5OTQgNTIuMDU2OSAxLjc5MTExIDUzLjQzMjkgMy4xNjcxQzU0LjgwODkgNC41NDMwOSA1NS42IDYuNjUyOTUgNTUuNiA5LjZINTcuNkM1Ny42IDYuMzA3MDUgNTYuNzExMSAzLjYxNjkgNTQuODQ3MSAxLjc1Mjg5QzUyLjk4MzEgLTAuMTExMTIxIDUwLjI5MyAtMS4wMDAwMSA0NyAtMS4wMDAwMVYwLjk5OTk5NFpNNTUuNiA5LjZDNTUuNiAxMC42ODA4IDU1LjYyODYgMTEuNTk3MiA1NS43NTcgMTIuMzQyNEM1NS44ODY5IDEzLjA5NTUgNTYuMTM3MiAxMy43OTE0IDU2LjY3MjkgMTQuMzI3MUM1Ny4yMDg2IDE0Ljg2MjggNTcuOTA0NSAxNS4xMTMxIDU4LjY1NzYgMTUuMjQzQzU5LjQwMjggMTUuMzcxNCA2MC4zMTkyIDE1LjQgNjEuNCAxNS40VjEzLjRDNjAuMzIwOCAxMy40IDU5LjU1NzIgMTMuMzY4NSA1OC45OTc0IDEzLjI3MkM1OC40NDU1IDEzLjE3NjkgNTguMjExNSAxMy4wMzcyIDU4LjA4NzEgMTIuOTEyOUM1Ny45NjI4IDEyLjc4ODUgNTcuODIzMSAxMi41NTQ1IDU3LjcyOCAxMi4wMDI2QzU3LjYzMTQgMTEuNDQyOCA1Ny42IDEwLjY3OTIgNTcuNiA5LjZINTUuNlpNNjEuNCAxNS40SDYyLjZWMTMuNEg2MS40VjE1LjRaTTYyLjYgMTUuNEM2NS41NDcxIDE1LjQgNjcuNjU2OSAxNi4xOTExIDY5LjAzMjkgMTcuNTY3MUM3MC40MDg5IDE4Ljk0MzEgNzEuMiAyMS4wNTI5IDcxLjIgMjRINzMuMkM3My4yIDIwLjcwNyA3Mi4zMTExIDE4LjAxNjkgNzAuNDQ3MSAxNi4xNTI5QzY4LjU4MzEgMTQuMjg4OSA2NS44OTMgMTMuNCA2Mi42IDEzLjRWMTUuNFpNNzEuMiAyNFY0Mkg3My4yVjI0SDcxLjJaTTcxLjIgNDJDNzEuMiA0My4wNzkyIDcxLjE2ODYgNDMuODQyOCA3MS4wNzIgNDQuNDAyNkM3MC45NzY5IDQ0Ljk1NDUgNzAuODM3MiA0NS4xODg1IDcwLjcxMjkgNDUuMzEyOUM3MC41ODg2IDQ1LjQzNzIgNzAuMzU0NSA0NS41NzY5IDY5LjgwMjYgNDUuNjcyQzY5LjI0MjggNDUuNzY4NiA2OC40NzkyIDQ1LjggNjcuNCA0NS44VjQ3LjhDNjguNDgwOCA0Ny44IDY5LjM5NzIgNDcuNzcxNCA3MC4xNDI0IDQ3LjY0M0M3MC44OTU1IDQ3LjUxMzEgNzEuNTkxNSA0Ny4yNjI4IDcyLjEyNzEgNDYuNzI3MUM3Mi42NjI4IDQ2LjE5MTQgNzIuOTEzMSA0NS40OTU1IDczLjA0MyA0NC43NDI0QzczLjE3MTQgNDMuOTk3MiA3My4yIDQzLjA4MDggNzMuMiA0Mkg3MS4yWk02Ny40IDQ1LjhINjEuNFY0Ny44SDY3LjRWNDUuOFpNNi41ODM0NSA2MC4zMDEyTDkuOTQzNDUgNDIuMDYxMkw3Ljk3NjU1IDQxLjY5ODhMNC42MTY1NSA1OS45Mzg4TDYuNTgzNDUgNjAuMzAxMlpNOS45NDU2MiA0Mi4wNDlDMTAuMTI0OSA0MS4wMDMzIDEwLjI4NiA0MC4yNTkxIDEwLjQ4MDIgMzkuNzEwNkMxMC42Njk5IDM5LjE3NDYgMTAuODY1MSAzOC45MDI4IDExLjA2NzMgMzguNzM1NkMxMS4yNzEzIDM4LjU2NyAxMS41ODI1IDM4LjQyMiAxMi4xNTkyIDM4LjMyNzVDMTIuNzQ3IDM4LjIzMTEgMTMuNTIzMyAzOC4yIDE0LjYgMzguMlYzNi4yQzEzLjUxNjcgMzYuMiAxMi41OTggMzYuMjI4OSAxMS44MzU4IDM2LjM1MzhDMTEuMDYyNSAzNi40ODA1IDEwLjM2ODcgMzYuNzE4IDkuNzkyNzQgMzcuMTk0NEM5LjIxNDg5IDM3LjY3MjIgOC44NTUxMSAzOC4zMDc5IDguNTk0ODIgMzkuMDQzMkM4LjMzOSAzOS43NjU5IDguMTU1MTIgNDAuNjU2NyA3Ljk3NDM4IDQxLjcxMUw5Ljk0NTYyIDQyLjA0OVpNMTQuNiAzOC4ySDIwLjZWMzYuMkgxNC42VjM4LjJaTTIwLjYgMzguMkMyMS42ODA5IDM4LjIgMjIuNDM0NiAzOC4yMzE2IDIyLjk2OTYgMzguMzI1NkMyMy41MDY0IDM4LjQxOTggMjMuNjU1NSAzOC41NDk5IDIzLjcwMzIgMzguNjA2OUMyMy43NTE0IDM4LjY2NDUgMjMuODUyNSAzOC44MzQxIDIzLjg1MjUgMzkuMzc2OUMyMy44NTI1IDM5LjkxNzUgMjMuNzU0OCA0MC42NTg0IDIzLjU3NDQgNDEuNzExTDI1LjU0NTYgNDIuMDQ5QzI1LjcyNTIgNDEuMDAxNiAyNS44NTI1IDQwLjEwNzUgMjUuODUyNSAzOS4zNzY5QzI1Ljg1MjUgMzguNjQ4NCAyNS43Mjg2IDM3LjkxMDUgMjUuMjM2OCAzNy4zMjMxQzI0Ljc0NDUgMzYuNzM1MSAyNC4wMzg2IDM2LjQ4MjcgMjMuMzE1NSAzNi4zNTU3QzIyLjU5MDQgMzYuMjI4NCAyMS42NzkxIDM2LjIgMjAuNiAzNi4yVjM4LjJaTTIzLjU3NzEgNDEuNjk1N0wxOS4yNTcxIDY0LjczNTdMMjEuMjIyOSA2NS4xMDQzTDI1LjU0MjkgNDIuMDY0M0wyMy41NzcxIDQxLjY5NTdaTTE5LjI1NDQgNjQuNzUxQzE5LjA3NDggNjUuNzk4NCAxOC45NDc1IDY2LjY5MjUgMTguOTQ3NSA2Ny40MjMxQzE4Ljk0NzUgNjguMTUxNiAxOS4wNzE0IDY4Ljg4OTUgMTkuNTYzMiA2OS40NzY5QzIwLjA1NTUgNzAuMDY0OSAyMC43NjE0IDcwLjMxNzMgMjEuNDg0NiA3MC40NDQzQzIyLjIwOTYgNzAuNTcxNiAyMy4xMjA5IDcwLjYgMjQuMiA3MC42VjY4LjZDMjMuMTE5MSA2OC42IDIyLjM2NTQgNjguNTY4NCAyMS44MzA1IDY4LjQ3NDRDMjEuMjkzNiA2OC4zODAyIDIxLjE0NDUgNjguMjUwMSAyMS4wOTY4IDY4LjE5MzFDMjEuMDQ4NiA2OC4xMzU1IDIwLjk0NzUgNjcuOTY1OSAyMC45NDc1IDY3LjQyMzFDMjAuOTQ3NSA2Ni44ODI1IDIxLjA0NTIgNjYuMTQxNiAyMS4yMjU2IDY1LjA4OUwxOS4yNTQ0IDY0Ljc1MVpNMjQuMiA3MC42SDcxVjY4LjZIMjQuMlY3MC42Wk03MSA3MC42QzcyLjA3OTIgNzAuNiA3Mi44NDI4IDcwLjYzMTQgNzMuNDAyNiA3MC43MjhDNzMuOTU0NSA3MC44MjMxIDc0LjE4ODYgNzAuOTYyOCA3NC4zMTI5IDcxLjA4NzFDNzQuNDM3MiA3MS4yMTE0IDc0LjU3NjkgNzEuNDQ1NSA3NC42NzIgNzEuOTk3NEM3NC43Njg2IDcyLjU1NzIgNzQuOCA3My4zMjA4IDc0LjggNzQuNEg3Ni44Qzc2LjggNzMuMzE5MiA3Ni43NzE1IDcyLjQwMjggNzYuNjQzIDcxLjY1NzZDNzYuNTEzMSA3MC45MDQ1IDc2LjI2MjggNzAuMjA4NSA3NS43MjcxIDY5LjY3MjlDNzUuMTkxNSA2OS4xMzcyIDc0LjQ5NTUgNjguODg2OSA3My43NDI0IDY4Ljc1N0M3Mi45OTcyIDY4LjYyODYgNzIuMDgwOCA2OC42IDcxIDY4LjZWNzAuNlpNNzQuOCA3NC40Vjc5LjJINzYuOFY3NC40SDc0LjhaTTc0LjggNzkuMkM3NC44IDgwLjI3OTIgNzQuNzY4NiA4MS4wNDI4IDc0LjY3MiA4MS42MDI2Qzc0LjU3NjkgODIuMTU0NSA3NC40MzcyIDgyLjM4ODUgNzQuMzEyOSA4Mi41MTI5Qzc0LjE4ODYgODIuNjM3MiA3My45NTQ1IDgyLjc3NjkgNzMuNDAyNiA4Mi44NzJDNzIuODQyOCA4Mi45Njg2IDcyLjA3OTIgODMgNzEgODNWODVDNzIuMDgwOCA4NSA3Mi45OTcyIDg0Ljk3MTQgNzMuNzQyNCA4NC44NDNDNzQuNDk1NSA4NC43MTMxIDc1LjE5MTUgODQuNDYyOCA3NS43MjcxIDgzLjkyNzFDNzYuMjYyOCA4My4zOTE0IDc2LjUxMzEgODIuNjk1NSA3Ni42NDMgODEuOTQyNEM3Ni43NzE1IDgxLjE5NzIgNzYuOCA4MC4yODA4IDc2LjggNzkuMkg3NC44Wk03MSA4M0gyOVY4NUg3MVY4M1pNMjkgODNDMjYuMDUzIDgzIDIzLjk0MzEgODIuMjA4OSAyMi41NjcxIDgwLjgzMjlDMjEuMTkxMSA3OS40NTY5IDIwLjQgNzcuMzQ3IDIwLjQgNzQuNEgxOC40QzE4LjQgNzcuNjkyOSAxOS4yODg5IDgwLjM4MzEgMjEuMTUyOSA4Mi4yNDcxQzIzLjAxNjkgODQuMTExMSAyNS43MDcxIDg1IDI5IDg1VjgzWk0yMC40IDc0LjRDMjAuNCA3My4zMTkyIDIwLjM3MTQgNzIuNDAyOCAyMC4yNDMgNzEuNjU3NkMyMC4xMTMxIDcwLjkwNDUgMTkuODYyOCA3MC4yMDg1IDE5LjMyNzEgNjkuNjcyOUMxOC43OTE1IDY5LjEzNzIgMTguMDk1NSA2OC44ODY5IDE3LjM0MjQgNjguNzU3QzE2LjU5NzIgNjguNjI4NiAxNS42ODA4IDY4LjYgMTQuNiA2OC42VjcwLjZDMTUuNjc5MiA3MC42IDE2LjQ0MjggNzAuNjMxNCAxNy4wMDI2IDcwLjcyOEMxNy41NTQ1IDcwLjgyMzEgMTcuNzg4NiA3MC45NjI4IDE3LjkxMjkgNzEuMDg3MUMxOC4wMzcyIDcxLjIxMTQgMTguMTc2OSA3MS40NDU1IDE4LjI3MiA3MS45OTc0QzE4LjM2ODYgNzIuNTU3MiAxOC40IDczLjMyMDggMTguNCA3NC40SDIwLjRaTTE0LjYgNjguNkgxMy40VjcwLjZIMTQuNlY2OC42Wk0xMy40IDY4LjZDMTAuNDM1NCA2OC42IDguNTM2ODkgNjcuODAyIDcuNDgyMzUgNjYuNTE5OEM2LjQyNzY3IDY1LjIzNzQgNi4wMTExNiA2My4yMjAyIDYuNTgxMzEgNjAuMzEyNEw0LjYxODY5IDU5LjkyNzZDMy45ODg4NCA2My4xMzk4IDQuMzUyMzMgNjUuODYyNiA1LjkzNzY1IDY3Ljc5MDJDNy41MjMxMSA2OS43MTggMTAuMTI0NiA3MC42IDEzLjQgNzAuNlY2OC42WiIgZmlsbD0iIzYzNjM2MyIgbWFzaz0idXJsKCNwYXRoLTEtaW5zaWRlLTFfMTUwOV8zMDI5MTUpIi8+Cjwvc3ZnPgo=', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkiIGhlaWdodD0iODQiIHZpZXdCb3g9IjAgMCA2OSA4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9InBhdGgtMS1pbnNpZGUtMV8xNTA5XzMwMjk3MCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNNS4yIDg0QzAuODggODQgMC40IDgzLjUyIDAuNCA3OS4yVjc0LjRDMC40IDcwLjA4IDAuODggNjkuNiA1LjIgNjkuNkg0OC40QzUyLjcyIDY5LjYgNTMuMiA2OS4xMiA1My4yIDY0LjhWNTQuNkM1My4yIDUwLjI4IDUyLjcyIDQ5LjggNDguNCA0OS44SDEyLjRDOC4wOCA0OS44IDcuNiA0OS4zMiA3LjYgNDVWNDAuMkM3LjYgMzUuODggOC4wOCAzNS40IDEyLjQgMzUuNEg0OC40QzUyLjcyIDM1LjQgNTMuMiAzNC45MiA1My4yIDMwLjZWMTkuMkM1My4yIDE0Ljg4IDUyLjcyIDE0LjQgNDguNCAxNC40SDUuMkMwLjg4IDE0LjQgMC40IDEzLjkyIDAuNCA5LjZWNC44QzAuNCAwLjQ3OTk5NSAwLjg4IC01LjcyMjA1ZS0wNiA1LjIgLTUuNzIyMDVlLTA2SDQyLjRDNDYuNzIgLTUuNzIyMDVlLTA2IDQ3LjU2IDAuMzU5OTk3IDUwLjU2IDMuMzU5OTlMNjUuNDQgMTguMjRDNjguNDQgMjEuMjQgNjguOCAyMi4wOCA2OC44IDI2LjRWMzAuNkM2OC44IDM0LjkyIDY4LjMyIDM1LjQgNjQgMzUuNEg1OEM1My42OCAzNS40IDUzLjIgMzUuODggNTMuMiA0MC4yVjQ1QzUzLjIgNDkuMzIgNTMuNjggNDkuOCA1OCA0OS44SDY0QzY4LjMyIDQ5LjggNjguOCA1MC4yOCA2OC44IDU0LjZWNjguNEM2OC44IDc5LjA4IDYzLjg4IDg0IDUzLjIgODRINS4yWiIvPgo8L21hc2s+CjxwYXRoIGQ9Ik01MC41NiAzLjM1OTk5TDUxLjI2NzEgMi42NTI4OUg1MS4yNjcxTDUwLjU2IDMuMzU5OTlaTTY1LjQ0IDE4LjI0TDY2LjE0NzEgMTcuNTMyOUw2NS40NCAxOC4yNFpNNS4yIDgzQzQuMTIwOCA4MyAzLjM1NzE5IDgyLjk2ODYgMi43OTc0MSA4Mi44NzJDMi4yNDU1MyA4Mi43NzY5IDIuMDExNDUgODIuNjM3MiAxLjg4NzExIDgyLjUxMjlDMS43NjI3NiA4Mi4zODg1IDEuNjIzMTEgODIuMTU0NSAxLjUyNzk2IDgxLjYwMjZDMS40MzE0NSA4MS4wNDI4IDEuNCA4MC4yNzkyIDEuNCA3OS4ySC0wLjZDLTAuNiA4MC4yODA4IC0wLjU3MTQ0NiA4MS4xOTcyIC0wLjQ0Mjk2IDgxLjk0MjRDLTAuMzEzMTExIDgyLjY5NTUgLTAuMDYyNzYyNyA4My4zOTE0IDAuNDcyODk0IDgzLjkyNzFDMS4wMDg1NSA4NC40NjI4IDEuNzA0NDcgODQuNzEzMSAyLjQ1NzU5IDg0Ljg0M0MzLjIwMjgxIDg0Ljk3MTQgNC4xMTkyIDg1IDUuMiA4NVY4M1pNMS40IDc5LjJWNzQuNEgtMC42Vjc5LjJIMS40Wk0xLjQgNzQuNEMxLjQgNzMuMzIwOCAxLjQzMTQ1IDcyLjU1NzIgMS41Mjc5NiA3MS45OTc0QzEuNjIzMTEgNzEuNDQ1NSAxLjc2Mjc2IDcxLjIxMTQgMS44ODcxMSA3MS4wODcxQzIuMDExNDUgNzAuOTYyOCAyLjI0NTUzIDcwLjgyMzEgMi43OTc0MSA3MC43MjhDMy4zNTcxOSA3MC42MzE0IDQuMTIwOCA3MC42IDUuMiA3MC42VjY4LjZDNC4xMTkyIDY4LjYgMy4yMDI4MSA2OC42Mjg2IDIuNDU3NTkgNjguNzU3QzEuNzA0NDcgNjguODg2OSAxLjAwODU1IDY5LjEzNzIgMC40NzI4OTQgNjkuNjcyOUMtMC4wNjI3NjI3IDcwLjIwODUgLTAuMzEzMTExIDcwLjkwNDUgLTAuNDQyOTYgNzEuNjU3NkMtMC41NzE0NDYgNzIuNDAyOCAtMC42IDczLjMxOTIgLTAuNiA3NC40SDEuNFpNNS4yIDcwLjZINDguNFY2OC42SDUuMlY3MC42Wk00OC40IDcwLjZDNDkuNDgwOCA3MC42IDUwLjM5NzIgNzAuNTcxNCA1MS4xNDI0IDcwLjQ0M0M1MS44OTU1IDcwLjMxMzEgNTIuNTkxNSA3MC4wNjI4IDUzLjEyNzEgNjkuNTI3MUM1My42NjI4IDY4Ljk5MTQgNTMuOTEzMSA2OC4yOTU1IDU0LjA0MyA2Ny41NDI0QzU0LjE3MTUgNjYuNzk3MiA1NC4yIDY1Ljg4MDggNTQuMiA2NC44SDUyLjJDNTIuMiA2NS44NzkyIDUyLjE2ODYgNjYuNjQyOCA1Mi4wNzIgNjcuMjAyNkM1MS45NzY5IDY3Ljc1NDUgNTEuODM3MiA2Ny45ODg1IDUxLjcxMjkgNjguMTEyOUM1MS41ODg2IDY4LjIzNzIgNTEuMzU0NSA2OC4zNzY5IDUwLjgwMjYgNjguNDcyQzUwLjI0MjggNjguNTY4NiA0OS40NzkyIDY4LjYgNDguNCA2OC42VjcwLjZaTTU0LjIgNjQuOFY1NC42SDUyLjJWNjQuOEg1NC4yWk01NC4yIDU0LjZDNTQuMiA1My41MTkyIDU0LjE3MTUgNTIuNjAyOCA1NC4wNDMgNTEuODU3NkM1My45MTMxIDUxLjEwNDUgNTMuNjYyOCA1MC40MDg1IDUzLjEyNzEgNDkuODcyOUM1Mi41OTE1IDQ5LjMzNzIgNTEuODk1NSA0OS4wODY5IDUxLjE0MjQgNDguOTU3QzUwLjM5NzIgNDguODI4NiA0OS40ODA4IDQ4LjggNDguNCA0OC44VjUwLjhDNDkuNDc5MiA1MC44IDUwLjI0MjggNTAuODMxNCA1MC44MDI2IDUwLjkyOEM1MS4zNTQ1IDUxLjAyMzEgNTEuNTg4NiA1MS4xNjI4IDUxLjcxMjkgNTEuMjg3MUM1MS44MzcyIDUxLjQxMTQgNTEuOTc2OSA1MS42NDU1IDUyLjA3MiA1Mi4xOTc0QzUyLjE2ODYgNTIuNzU3MiA1Mi4yIDUzLjUyMDggNTIuMiA1NC42SDU0LjJaTTQ4LjQgNDguOEgxMi40VjUwLjhINDguNFY0OC44Wk0xMi40IDQ4LjhDMTEuMzIwOCA0OC44IDEwLjU1NzIgNDguNzY4NSA5Ljk5NzQxIDQ4LjY3MkM5LjQ0NTUzIDQ4LjU3NjkgOS4yMTE0NSA0OC40MzcyIDkuMDg3MTEgNDguMzEyOUM4Ljk2Mjc2IDQ4LjE4ODUgOC44MjMxMSA0Ny45NTQ1IDguNzI3OTYgNDcuNDAyNkM4LjYzMTQ1IDQ2Ljg0MjggOC42IDQ2LjA3OTIgOC42IDQ1SDYuNkM2LjYgNDYuMDgwOCA2LjYyODU2IDQ2Ljk5NzIgNi43NTcwNCA0Ny43NDI0QzYuODg2ODkgNDguNDk1NSA3LjEzNzI0IDQ5LjE5MTUgNy42NzI4OSA0OS43MjcxQzguMjA4NTUgNTAuMjYyOCA4LjkwNDQ3IDUwLjUxMzEgOS42NTc1OSA1MC42NDNDMTAuNDAyOCA1MC43NzE0IDExLjMxOTIgNTAuOCAxMi40IDUwLjhWNDguOFpNOC42IDQ1VjQwLjJINi42VjQ1SDguNlpNOC42IDQwLjJDOC42IDM5LjEyMDggOC42MzE0NSAzOC4zNTcyIDguNzI3OTYgMzcuNzk3NEM4LjgyMzExIDM3LjI0NTUgOC45NjI3NiAzNy4wMTE0IDkuMDg3MTEgMzYuODg3MUM5LjIxMTQ1IDM2Ljc2MjggOS40NDU1MyAzNi42MjMxIDkuOTk3NDEgMzYuNTI4QzEwLjU1NzIgMzYuNDMxNCAxMS4zMjA4IDM2LjQgMTIuNCAzNi40VjM0LjRDMTEuMzE5MiAzNC40IDEwLjQwMjggMzQuNDI4NiA5LjY1NzU5IDM0LjU1N0M4LjkwNDQ3IDM0LjY4NjkgOC4yMDg1NSAzNC45MzcyIDcuNjcyODkgMzUuNDcyOUM3LjEzNzI0IDM2LjAwODUgNi44ODY4OSAzNi43MDQ1IDYuNzU3MDQgMzcuNDU3NkM2LjYyODU2IDM4LjIwMjggNi42IDM5LjExOTIgNi42IDQwLjJIOC42Wk0xMi40IDM2LjRINDguNFYzNC40SDEyLjRWMzYuNFpNNDguNCAzNi40QzQ5LjQ4MDggMzYuNCA1MC4zOTcyIDM2LjM3MTQgNTEuMTQyNCAzNi4yNDNDNTEuODk1NSAzNi4xMTMxIDUyLjU5MTUgMzUuODYyOCA1My4xMjcxIDM1LjMyNzFDNTMuNjYyOCAzNC43OTE1IDUzLjkxMzEgMzQuMDk1NSA1NC4wNDMgMzMuMzQyNEM1NC4xNzE1IDMyLjU5NzIgNTQuMiAzMS42ODA4IDU0LjIgMzAuNkg1Mi4yQzUyLjIgMzEuNjc5MiA1Mi4xNjg2IDMyLjQ0MjggNTIuMDcyIDMzLjAwMjZDNTEuOTc2OSAzMy41NTQ1IDUxLjgzNzIgMzMuNzg4NSA1MS43MTI5IDMzLjkxMjlDNTEuNTg4NiAzNC4wMzcyIDUxLjM1NDUgMzQuMTc2OSA1MC44MDI2IDM0LjI3MkM1MC4yNDI4IDM0LjM2ODUgNDkuNDc5MiAzNC40IDQ4LjQgMzQuNFYzNi40Wk01NC4yIDMwLjZWMTkuMkg1Mi4yVjMwLjZINTQuMlpNNTQuMiAxOS4yQzU0LjIgMTguMTE5MiA1NC4xNzE1IDE3LjIwMjggNTQuMDQzIDE2LjQ1NzZDNTMuOTEzMSAxNS43MDQ1IDUzLjY2MjggMTUuMDA4NSA1My4xMjcxIDE0LjQ3MjlDNTIuNTkxNSAxMy45MzcyIDUxLjg5NTUgMTMuNjg2OSA1MS4xNDI0IDEzLjU1N0M1MC4zOTcyIDEzLjQyODUgNDkuNDgwOCAxMy40IDQ4LjQgMTMuNFYxNS40QzQ5LjQ3OTIgMTUuNCA1MC4yNDI4IDE1LjQzMTQgNTAuODAyNiAxNS41MjhDNTEuMzU0NSAxNS42MjMxIDUxLjU4ODYgMTUuNzYyOCA1MS43MTI5IDE1Ljg4NzFDNTEuODM3MiAxNi4wMTE0IDUxLjk3NjkgMTYuMjQ1NSA1Mi4wNzIgMTYuNzk3NEM1Mi4xNjg2IDE3LjM1NzIgNTIuMiAxOC4xMjA4IDUyLjIgMTkuMkg1NC4yWk00OC40IDEzLjRINS4yVjE1LjRINDguNFYxMy40Wk01LjIgMTMuNEM0LjEyMDggMTMuNCAzLjM1NzE5IDEzLjM2ODUgMi43OTc0MSAxMy4yNzJDMi4yNDU1MyAxMy4xNzY5IDIuMDExNDUgMTMuMDM3MiAxLjg4NzExIDEyLjkxMjlDMS43NjI3NiAxMi43ODg1IDEuNjIzMTEgMTIuNTU0NSAxLjUyNzk2IDEyLjAwMjZDMS40MzE0NSAxMS40NDI4IDEuNCAxMC42NzkyIDEuNCA5LjZILTAuNkMtMC42IDEwLjY4MDggLTAuNTcxNDQ2IDExLjU5NzIgLTAuNDQyOTYgMTIuMzQyNEMtMC4zMTMxMTEgMTMuMDk1NSAtMC4wNjI3NjIzIDEzLjc5MTQgMC40NzI4OTQgMTQuMzI3MUMxLjAwODU1IDE0Ljg2MjggMS43MDQ0NyAxNS4xMTMxIDIuNDU3NTkgMTUuMjQzQzMuMjAyODEgMTUuMzcxNCA0LjExOTIgMTUuNCA1LjIgMTUuNFYxMy40Wk0xLjQgOS42VjQuOEgtMC42VjkuNkgxLjRaTTEuNCA0LjhDMS40IDMuNzIwOCAxLjQzMTQ1IDIuOTU3MTggMS41Mjc5NiAyLjM5NzRDMS42MjMxMSAxLjg0NTUzIDEuNzYyNzYgMS42MTE0NSAxLjg4NzExIDEuNDg3MUMyLjAxMTQ1IDEuMzYyNzYgMi4yNDU1MyAxLjIyMzEgMi43OTc0MSAxLjEyNzk1QzMuMzU3MTkgMS4wMzE0NCA0LjEyMDggMC45OTk5OTQgNS4yIDAuOTk5OTk0Vi0xLjAwMDAxQzQuMTE5MiAtMS4wMDAwMSAzLjIwMjgxIC0wLjk3MTQ1MiAyLjQ1NzU5IC0wLjg0Mjk2NkMxLjcwNDQ3IC0wLjcxMzExNyAxLjAwODU1IC0wLjQ2Mjc2OCAwLjQ3Mjg5MyAwLjA3Mjg4NzRDLTAuMDYyNzYyNyAwLjYwODU0NSAtMC4zMTMxMTEgMS4zMDQ0NiAtMC40NDI5NiAyLjA1NzU5Qy0wLjU3MTQ0NiAyLjgwMjgxIC0wLjYgMy43MTkxOSAtMC42IDQuOEgxLjRaTTUuMiAwLjk5OTk5NEg0Mi40Vi0xLjAwMDAxSDUuMlYwLjk5OTk5NFpNNDIuNCAwLjk5OTk5NEM0NC41NzE5IDAuOTk5OTk0IDQ1LjY3NCAxLjA5OTI5IDQ2LjU5MyAxLjQ3OTE2QzQ3LjUxMDkgMS44NTg1NSA0OC4zNDM4IDIuNTU3OTkgNDkuODUyOSA0LjA2NzFMNTEuMjY3MSAyLjY1Mjg5QzQ5Ljc3NjIgMS4xNjIgNDguNjg5MSAwLjE4MTQzOCA0Ny4zNTcgLTAuMzY5MTcyQzQ2LjAyNiAtMC45MTkzMDIgNDQuNTQ4MiAtMS4wMDAwMSA0Mi40IC0xLjAwMDAxVjAuOTk5OTk0Wk00OS44NTI5IDQuMDY3MUw2NC43MzI5IDE4Ljk0NzFMNjYuMTQ3MSAxNy41MzI5TDUxLjI2NzEgMi42NTI4OUw0OS44NTI5IDQuMDY3MVpNNjQuNzMyOSAxOC45NDcxQzY2LjI0MiAyMC40NTYyIDY2Ljk0MTQgMjEuMjg5MSA2Ny4zMjA4IDIyLjIwN0M2Ny43MDA3IDIzLjEyNiA2Ny44IDI0LjIyODEgNjcuOCAyNi40SDY5LjhDNjkuOCAyNC4yNTE5IDY5LjcxOTMgMjIuNzc0IDY5LjE2OTIgMjEuNDQzQzY4LjYxODYgMjAuMTEwOSA2Ny42MzggMTkuMDIzOCA2Ni4xNDcxIDE3LjUzMjlMNjQuNzMyOSAxOC45NDcxWk02Ny44IDI2LjRWMzAuNkg2OS44VjI2LjRINjcuOFpNNjcuOCAzMC42QzY3LjggMzEuNjc5MiA2Ny43Njg2IDMyLjQ0MjggNjcuNjcyIDMzLjAwMjZDNjcuNTc2OSAzMy41NTQ1IDY3LjQzNzIgMzMuNzg4NSA2Ny4zMTI5IDMzLjkxMjlDNjcuMTg4NiAzNC4wMzcyIDY2Ljk1NDUgMzQuMTc2OSA2Ni40MDI2IDM0LjI3MkM2NS44NDI4IDM0LjM2ODUgNjUuMDc5MiAzNC40IDY0IDM0LjRWMzYuNEM2NS4wODA4IDM2LjQgNjUuOTk3MiAzNi4zNzE0IDY2Ljc0MjQgMzYuMjQzQzY3LjQ5NTUgMzYuMTEzMSA2OC4xOTE1IDM1Ljg2MjggNjguNzI3MSAzNS4zMjcxQzY5LjI2MjggMzQuNzkxNSA2OS41MTMxIDM0LjA5NTUgNjkuNjQzIDMzLjM0MjRDNjkuNzcxNSAzMi41OTcyIDY5LjggMzEuNjgwOCA2OS44IDMwLjZINjcuOFpNNjQgMzQuNEg1OFYzNi40SDY0VjM0LjRaTTU4IDM0LjRDNTYuOTE5MiAzNC40IDU2LjAwMjggMzQuNDI4NiA1NS4yNTc2IDM0LjU1N0M1NC41MDQ1IDM0LjY4NjkgNTMuODA4NiAzNC45MzcyIDUzLjI3MjkgMzUuNDcyOUM1Mi43MzcyIDM2LjAwODUgNTIuNDg2OSAzNi43MDQ1IDUyLjM1NyAzNy40NTc2QzUyLjIyODYgMzguMjAyOCA1Mi4yIDM5LjExOTIgNTIuMiA0MC4ySDU0LjJDNTQuMiAzOS4xMjA4IDU0LjIzMTUgMzguMzU3MiA1NC4zMjggMzcuNzk3NEM1NC40MjMxIDM3LjI0NTUgNTQuNTYyOCAzNy4wMTE0IDU0LjY4NzEgMzYuODg3MUM1NC44MTE1IDM2Ljc2MjggNTUuMDQ1NSAzNi42MjMxIDU1LjU5NzQgMzYuNTI4QzU2LjE1NzIgMzYuNDMxNCA1Ni45MjA4IDM2LjQgNTggMzYuNFYzNC40Wk01Mi4yIDQwLjJWNDVINTQuMlY0MC4ySDUyLjJaTTUyLjIgNDVDNTIuMiA0Ni4wODA4IDUyLjIyODYgNDYuOTk3MiA1Mi4zNTcgNDcuNzQyNEM1Mi40ODY5IDQ4LjQ5NTUgNTIuNzM3MiA0OS4xOTE0IDUzLjI3MjkgNDkuNzI3MUM1My44MDg2IDUwLjI2MjggNTQuNTA0NSA1MC41MTMxIDU1LjI1NzYgNTAuNjQzQzU2LjAwMjggNTAuNzcxNCA1Ni45MTkyIDUwLjggNTggNTAuOFY0OC44QzU2LjkyMDggNDguOCA1Ni4xNTcyIDQ4Ljc2ODUgNTUuNTk3NCA0OC42NzJDNTUuMDQ1NSA0OC41NzY5IDU0LjgxMTUgNDguNDM3MiA1NC42ODcxIDQ4LjMxMjlDNTQuNTYyOCA0OC4xODg1IDU0LjQyMzEgNDcuOTU0NSA1NC4zMjggNDcuNDAyNkM1NC4yMzE1IDQ2Ljg0MjggNTQuMiA0Ni4wNzkyIDU0LjIgNDVINTIuMlpNNTggNTAuOEg2NFY0OC44SDU4VjUwLjhaTTY0IDUwLjhDNjUuMDc5MiA1MC44IDY1Ljg0MjggNTAuODMxNCA2Ni40MDI2IDUwLjkyOEM2Ni45NTQ1IDUxLjAyMzEgNjcuMTg4NiA1MS4xNjI4IDY3LjMxMjkgNTEuMjg3MUM2Ny40MzcyIDUxLjQxMTQgNjcuNTc2OSA1MS42NDU1IDY3LjY3MiA1Mi4xOTc0QzY3Ljc2ODYgNTIuNzU3MiA2Ny44IDUzLjUyMDggNjcuOCA1NC42SDY5LjhDNjkuOCA1My41MTkyIDY5Ljc3MTUgNTIuNjAyOCA2OS42NDMgNTEuODU3NkM2OS41MTMxIDUxLjEwNDUgNjkuMjYyOCA1MC40MDg1IDY4LjcyNzEgNDkuODcyOUM2OC4xOTE1IDQ5LjMzNzIgNjcuNDk1NSA0OS4wODY5IDY2Ljc0MjQgNDguOTU3QzY1Ljk5NzIgNDguODI4NiA2NS4wODA4IDQ4LjggNjQgNDguOFY1MC44Wk02Ny44IDU0LjZWNjguNEg2OS44VjU0LjZINjcuOFpNNjcuOCA2OC40QzY3LjggNzMuNjA2NSA2Ni41OTkyIDc3LjE5NjYgNjQuMjk3OSA3OS40OTc5QzYxLjk5NjYgODEuNzk5MiA1OC40MDY1IDgzIDUzLjIgODNWODVDNTguNjczNSA4NSA2Mi44ODM0IDgzLjc0MDggNjUuNzEyMSA4MC45MTIxQzY4LjU0MDggNzguMDgzNCA2OS44IDczLjg3MzUgNjkuOCA2OC40SDY3LjhaTTUzLjIgODNINS4yVjg1SDUzLjJWODNaIiBmaWxsPSIjNjM2MzYzIiBtYXNrPSJ1cmwoI3BhdGgtMS1pbnNpZGUtMV8xNTA5XzMwMjk3MCkiLz4KPC9zdmc+Cg=='];
const ARROW = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDIzIDIzIiB3aWR0aD0iMjMiIGhlaWdodD0iMjMiPjxzdHlsZT4uYXtmaWxsOiMwZTBlMGV9PC9zdHlsZT48cGF0aCBjbGFzcz0iYSIgZD0ibTEwLjYgNGMtMC41IDAtMC45IDAuNC0wLjkgMC45djEuN2MwIDAuNSAwLjQgMC45IDAuOSAwLjloMS4zYzAuNSAwIDAuOCAwLjQgMC44IDAuOHYxLjRxMCAwLjEgMC4xIDAuM2gtNy41Yy0wLjYgMC0xIDAuNC0xIDF2MWMwIDAuNiAwLjQgMSAxIDFoNy4ycS0wLjIgMC4yLTAuMiAwLjZ2MS4zYzAgMC40LTAuNCAwLjgtMC45IDAuOGgtMS4zYy0wLjQgMC0wLjggMC40LTAuOCAwLjl2MS43YzAgMC41IDAuNCAwLjkgMC44IDAuOWgxLjhjMC41IDAgMC44LTAuNCAwLjgtMC45di0xLjNjMC0wLjQgMC40LTAuOCAwLjktMC44aDEuM2MwLjUgMCAwLjktMC40IDAuOS0wLjl2LTAuOWMwLTAuNCAwLjQtMC44IDAuOS0wLjhoMS43YzAuNSAwIDAuOS0wLjQgMC45LTAuOXYtMS43cTAtMC40LTAuMi0wLjZjLTAuMi0wLjItMC41LTAuNC0wLjgtMC40aC0xLjZjLTAuMy0wLjEtMC41LTAuNC0wLjUtMC44di0xLjNjMC0wLjUtMC40LTAuOS0wLjktMC45aC0xLjNjLTAuNCAwLTAuOC0wLjMtMC44LTAuOHYtMS4zYzAtMC41LTAuNC0wLjktMC45LTAuOXoiLz48L3N2Zz4=';
const CONTACT_EMAIL = 'events@college.example.com';
const TERMS_HREF = '/terms-of-service';

type GameFormat = 'solo' | 'duo' | 'squad';

const GAMES: { slug: string; name: string; format: GameFormat }[] = [
  { slug: 'game-1', name: 'Game 1', format: 'solo' },
  { slug: 'game-2', name: 'Game 2', format: 'solo' },
  { slug: 'game-3', name: 'Game 3', format: 'duo' },
  { slug: 'game-4', name: 'Game 4', format: 'duo' },
  { slug: 'game-5', name: 'Game 5', format: 'squad' },
  { slug: 'game-6', name: 'Game 6', format: 'squad' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-()\s.]{7,20}$/;

function FieldHead({ nb, label, htmlFor }: { nb: string; label: string; htmlFor?: string }) {
  return (
    <div className="field-head">
      <div className="field-head-status">
        <div className="field-head-nb">{nb}</div>
        <img alt="" className="field-head-check" height={12} loading="lazy" src={CHECK} width={16} />
      </div>
      {htmlFor ? (
        <label className="field-head-label" htmlFor={htmlFor}>{label}</label>
      ) : (
        <div className="field-head-label">{label}</div>
      )}
    </div>
  );
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const initialGame = GAMES.find((g) => g.slug === searchParams.get('game'))?.slug ?? null;
  const [game, setGame] = useState<string | null>(initialGame);
  const [nameState, setName] = useState('');
  const [emailState, setEmail] = useState('');
  const [phoneState, setPhone] = useState('');
  const [collegeIdState, setCollegeId] = useState('');
  const [deptYearState, setDeptYear] = useState('');
  const [teamNameState, setTeamName] = useState('');
  const [teammatesState, setTeammates] = useState('');
  const [additionalState, setAdditional] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const selectedGame = GAMES.find((g) => g.slug === game) ?? null;
  const wantTeam = selectedGame !== null && selectedGame.format !== 'solo';

  const handleGameChange = (slug: string) => {
    const g = GAMES.find((item) => item.slug === slug);
    setGame(slug);
    if (g && g.format === 'solo') {
      setTeamName('');
      setTeammates('');
    }
    setError(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!game) errs.push('Please select a game.');
    if (!nameState.trim()) errs.push('Please enter your full name.');
    if (!EMAIL_RE.test(emailState)) errs.push('Please enter a valid email address.');
    if (!PHONE_RE.test(phoneState)) errs.push('Please enter a valid phone number.');
    if (!collegeIdState.trim()) errs.push('Please enter your college ID / roll no.');
    if (!deptYearState.trim()) errs.push('Please enter your department and year.');
    if (wantTeam) {
      if (!teamNameState.trim()) errs.push('Please enter your team name.');
      if (!teammatesState.trim()) errs.push('Please enter your teammate names and emails.');
    }
    if (errs.length > 0) {
      setError(errs.join(' '));
      setDone(false);
      return;
    }
    setError(null);
    setDone(true);
  };

  return (
    <>
      <div className="page-form w-form">
        <form ref={formRef} aria-label="Register Form" onSubmit={handleSubmit} noValidate>
          <div className="form-section">
            <div className="form-col form-col-first" />
            <div className="form-col form-col-second">
              <div className="form-step">
                <img alt="" className="form-step-nb" height={84} loading="lazy" src={STEP_ICONS[0]} />
                <div className="form-step-name">Personal information</div>
                <div className="form-step-sub-info">STEP 1 of 3</div>
              </div>
            </div>
            <div className="form-col">
              <div className="form-row">
                <div className="form-row-item">
                  <FieldHead nb="1.1" label="Which game are you registering for?" />
                  <div className="form-radio-list">
                    {GAMES.map((g) => (
                      <label key={g.slug} className="radio-tab w-radio">
                        <div
                          className={
                            game === g.slug
                              ? 'w-form-formradioinput w-form-formradioinput--inputType-custom radio-tab-button w-radio-input w--redirected-checked'
                              : 'w-form-formradioinput w-form-formradioinput--inputType-custom radio-tab-button w-radio-input'
                          }
                        />
                        <input
                          data-name="Game"
                          type="radio"
                          name="Game"
                          value={g.slug}
                          onChange={() => handleGameChange(g.slug)}
                          style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                        />
                        <span className="radio-tab-label w-form-label">{g.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-row fr-double">
                <div className="form-row-item">
                  <FieldHead nb="1.2" label="Full Name" htmlFor="full-name" />
                  <input
                    className="form-field-text w-input"
                    data-name="Full Name"
                    id="full-name"
                    name="full-name"
                    placeholder="Name"
                    type="text"
                    value={nameState}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-row-item">
                  <FieldHead nb="1.3" label="Email Address" htmlFor="email-3" />
                  <input
                    className="form-field-text w-input"
                    data-name="Email"
                    id="email-3"
                    name="email-3"
                    placeholder="[you@mail.com]"
                    type="email"
                    value={emailState}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row fr-double fr-last">
                <div className="form-row-item">
                  <FieldHead nb="1.4" label="Phone Number" htmlFor="phone" />
                  <input
                    className="form-field-text w-input"
                    data-name="Phone"
                    id="phone"
                    name="phone"
                    placeholder="[+91 ...]"
                    type="tel"
                    value={phoneState}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-row-item">
                  <FieldHead nb="1.5" label="College ID / Roll No." htmlFor="college-id" />
                  <input
                    className="form-field-text w-input"
                    data-name="College ID"
                    id="college-id"
                    name="college-id"
                    placeholder="[ID / roll no.]"
                    type="text"
                    value={collegeIdState}
                    onChange={(e) => setCollegeId(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-section">
            <div className="form-col form-col-first">
              <div className="form-notice">
                Please{' '}
                <a className="form-notice-link" href={'mailto:' + CONTACT_EMAIL}>
                  contact us
                </a>{' '}
                if you have any questions regarding the form
              </div>
            </div>
            <div className="form-col form-col-second">
              <div className="form-step">
                <img alt="" className="form-step-nb" height={84} loading="lazy" src={STEP_ICONS[1]} />
                <div className="form-step-name">Academic &amp; team</div>
                <div className="form-step-sub-info">STEP 2 of 3</div>
              </div>
            </div>
            <div className="form-col">
              <div className="form-row">
                <div className="form-row-item">
                  <FieldHead nb="2.1" label="Department &amp; Year" htmlFor="dept-year" />
                  <input
                    className="form-field-text w-input"
                    data-name="Department and Year"
                    id="dept-year"
                    name="dept-year"
                    placeholder="[e.g. CSE, 2nd year]"
                    type="text"
                    value={deptYearState}
                    onChange={(e) => setDeptYear(e.target.value)}
                  />
                </div>
              </div>
              {wantTeam ? (
                <>
                  <div className="form-row">
                    <div className="form-row-item">
                      <FieldHead nb="2.2" label="Team Name" htmlFor="team-name" />
                      <input
                        className="form-field-text w-input"
                        data-name="Team Name"
                        id="team-name"
                        name="team-name"
                        placeholder="[e.g. Team Phoenix]"
                        type="text"
                        value={teamNameState}
                        onChange={(e) => setTeamName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row fr-last">
                    <div className="form-row-item">
                      <FieldHead nb="2.3" label="Teammates" htmlFor="teammates" />
                      <textarea
                        className="form-field-text w-input"
                        data-name="Teammates"
                        id="teammates"
                        name="teammates"
                        maxLength={5000}
                        placeholder="[Name (email), separated by comma]"
                        value={teammatesState}
                        onChange={(e) => setTeammates(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="form-row fr-last">
                  <div className="form-row-item">
                    <div className="form-notice">Team details appear when you pick a duo or squad game.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form-section">
            <div className="form-col form-col-first" />
            <div className="form-col form-col-second">
              <div className="form-step">
                <img alt="" className="form-step-nb" height={84} loading="lazy" src={STEP_ICONS[2]} />
                <div className="form-step-name">Almost done</div>
                <div className="form-step-sub-info">STEP 3 of 3</div>
              </div>
            </div>
            <div className="form-col form-col-border-bottom">
              <div className="form-row">
                <div className="form-row-item">
                  <FieldHead nb="3.1" label="Additional information?" htmlFor="additional-information" />
                  <textarea
                    className="form-field-text w-input"
                    data-name="Additional information"
                    id="additional-information"
                    name="additional-information"
                    maxLength={5000}
                    placeholder="[Optional — share anything else we should know]"
                    value={additionalState}
                    onChange={(e) => setAdditional(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-notice form-notice-tablet">
                Please{' '}
                <a className="form-notice-link" href={'mailto:' + CONTACT_EMAIL}>
                  contact us
                </a>{' '}
                if you have any questions regarding the form
              </div>
              <div className="form-actions">
                <a
                  className="button-primary width-100 w-inline-block"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    formRef.current?.requestSubmit();
                  }}
                >
                  <div className="button-primary-border">
                    <div className="button-primary-text button-size-text-lg button-with-icon">
                      <div>Register now</div>
                      <img alt="" className="button-primary-icon" height={23} loading="lazy" src={ARROW} width={23} />
                    </div>
                  </div>
                </a>
                <input className="button-submit-hidden w-button" type="submit" value="Submit" data-wait="Please wait..." />
                <div className="form-terms">
                  By submitting the form, you agree to the event&apos;s{' '}
                  <a className="form-terms-link" href={TERMS_HREF}>
                    Terms and Conditions
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </form>
        {done && (
          <div
            aria-label="Register Form success"
            className="w-form-done"
            role="region"
            tabIndex={-1}
            style={{ display: 'block' }}
          >
            <div>Thank you! Your registration has been received. See you on the day of the game.</div>
          </div>
        )}
        {error && (
          <div
            aria-label="Register Form failure"
            className="w-form-fail"
            role="region"
            tabIndex={-1}
            style={{ display: 'block' }}
          >
            <div>{error}</div>
          </div>
        )}
        <div className="form-custom-styles w-embed" />
      </div>
    </>
  );
}

export default function RegisterFormView() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
