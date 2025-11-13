export class CastMember {
  constructor(public id: number,
              public name: string,
              public roleName: string,
              public realAvatar: string,
              public roleAvatar: string,
              public birthday?: string, // show birthday as is
              public fullInfoUrl?: string,
  ) {
  }

  // think about validation or other entity relation methods if needed
}
