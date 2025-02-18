export function encodeTeamName(name: string): string {
    return encodeURIComponent(name.replace(/\s+/g, "-").toLowerCase());
  }
  
export function decodeTeamName(name: string): string {
  return decodeURIComponent(name.replace(/-/g, " "));
}

export function encodePlayerName(nickname: string): string {
  return encodeURIComponent(nickname.replace(/\s+/g, "-").toLowerCase());
}

export function decodePlayerName(nickname: string): string {
  return decodeURIComponent(nickname.replace(/-/g, " "));
}


  