import React, { LegacyRef } from 'react';
import random from 'random';
import { Howl } from 'howler';
interface ColumnsState {
  array: Array<number>,
  aryAccesses: number,

}
class Columns extends React.Component<{}, ColumnsState> {
  ary: Array<number>;
  aryAccesses: number;
  // audio = new Howl({ src: ['~/temp/react/src/pop.mp3'] })
  audioRef: React.RefObject<HTMLAudioElement> = React.createRef();
  constructor(props: any) {
    super(props);
    this.state = { array: [], aryAccesses: 0 };
    this.ary = [];
    this.aryAccesses = 0;
  }


  componentDidMount() {
    let ary: Array<number> = []
    for (let i = 0; i < 1000; i++) {
      ary.push(i)
    }
    for (let i = 0; i < 1000; i++) {
      ary.push(ary.splice(random.int(0, 1000 - i), 1)[0])
    }
    this.ary = ary;
    this.aryAccesses = 0;
    this.setState({ array: ary, aryAccesses: this.aryAccesses })
  }

  sort(ary: Array<number>) {
    this.setState({ array: ary.sort((a: number, b: number) => a - b) })
  }

  async insertion_sort() {
    for (let i = 0; i < this.ary.length; i++) {
      for (let j = i; j > 0 && this.ary[j] <= this.ary[j - 1]; j--) {
        let hold = this.ary[j];
        this.ary[j] = this.ary[j - 1];
        this.ary[j - 1] = hold;
        this.setState({ array: this.ary })
        await new Promise(r => setTimeout(r, .005));
      }
    }
  }

  async combine(ary1: Array<number>, ary2: Array<number>, index: number) {
    let newAry: Array<number> = []
    ary1 = ary1.reverse()
    ary2 = ary2.reverse()
    while (ary1.length > 0 && ary2.length > 0) {
      if (ary1[ary1.length - 1] < ary2[ary2.length - 1]) {
        let f = ary1.pop()
        if (typeof f === "number") {
          newAry.push(f)
        }
      } else {
        let f = ary2.pop()
        if (typeof f === "number") {
          newAry.push(f)
        }
      }
    }
    let nonemptyArray = ary1
    if (ary1.length === 0) {
      nonemptyArray = ary2
    }
    while (nonemptyArray.length > 0) {
      let f = nonemptyArray.pop()
      if (typeof f === "number") {
        newAry.push(f)
      }
    }
    for (const { i, value } of newAry.map((value, index) => ({ i: index, value }))) {
      this.ary[index + i] = value
      this.setState({ array: this.ary })
      await new Promise(r => setTimeout(r, .005));
    }
    return newAry
  }

  async merge_sort(ary: Array<number>, index: number) {
    switch (ary.length) {
      case 0 || 1:
        return ary
      case 2:
        if (ary[0] > ary[1]) {
          let hold = ary[0]
          ary[0] = ary[1]
          ary[1] = hold
        }
        return ary
      default:
        let mid = ary.length / 2 | 0
        let ary1 = ary.slice(0, mid)
        let ary2 = ary.slice(mid, ary.length)
        ary1 = await this.merge_sort(ary1, index)
        ary2 = await this.merge_sort(ary2, index + mid)
        return this.combine(ary1, ary2, index)
    }


    // if (ary.length <= 1) {
    //   return ary;
    // }
    // if (ary.length === 2) {
    //   if (ary[0] > ary[1]) {
    //     let hold = ary[0]
    //     ary[0] = ary[1]
    //     ary[1] = hold
    //   }
    //   return ary
    // } else {
    //   let mid = ary.length / 2 | 0
    //   let ary1 = ary.slice(0, mid)
    //   let ary2 = ary.slice(mid, ary.length)
    //   ary1 = await this.merge_sort(ary1, index)
    //   ary2 = await this.merge_sort(ary2, index + mid)
    //   return this.combine(ary1, ary2, index)
    // }
  }

  async selection_sort() {
    for (let i = 0; i < this.ary.length; i++) {
      let min = i
      for (let j = i + 1; j < this.ary.length; j++) {
        if (this.ary[j] < this.ary[min]) {
          min = j
        }
      }
      for (let j = min; j > i; j--) {
        let hold = this.ary[j]
        this.ary[j] = this.ary[j - 1]
        this.ary[j - 1] = hold
        this.setState({ array: this.ary })
        await new Promise(r => setTimeout(r, .0005));

      }
      // let hold = this.ary[i]
      // this.ary[i] = this.ary[min]
      // this.ary[min] = hold
      // this.setState({ array: this.ary })
      // await new Promise(r => setTimeout(r, .05));
    }
  }

  render() {
    // this.audio.play()
    // this.ary = this.state.array;
    // this.aryAccesses = this.state.aryAccesses


    let a = this.ary.map((value: any, id: any) =>
      <div
        key={id}
        style={{ height: value, backgroundColor: "red", width: "2px", paddingLeft: "1px", alignSelf: "flex-end" }}>
      </div>
    )

    return (

      <div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "auto" }}>Array Accesses: {this.aryAccesses}</div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "auto" }}>{a}</div>
        <button onClick={() => this.insertion_sort()}>
          INSERTION SORT
        </button>
        <button onClick={() => this.merge_sort(this.ary, 0)}>
          MERGE SORT
        </button>
        <button onClick={() => this.selection_sort()}>
          SELECTION SORT
        </button>
        <button onClick={() => this.sort(this.ary)}>
          BUBBLE SORT
        </button>

        <button onClick={() => { this.sort(this.ary); this.setState({ array: this.ary.reverse() }) }}>
          REVERSE
        </button>
        <button onClick={() => { this.componentDidMount() }}>
          RANDOMIZE
        </button>
      </div >
    )
  }
}

export default Columns;
