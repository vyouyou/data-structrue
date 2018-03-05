/**
 * Created by vyouyou on 18-2-25.
 */
import { VStatus, EType } from "./config/enum";

interface Graph<Tv, Te> {
    n: number;
    insert(tv: Tv): number;
    remove(index: number): Tv;
    getVertex(index: number): Tv;
    //入度
    getInDegree(index: number): number;
    //出度
    getOutDegre(index: number): number;
    getStatus(index: number): VStatus;

    e: number;
    existsEdge(v: number, u: number): boolean;
    insertEdge(edge: Te, v: number, u: number, weight: number);
    removeEdge(v: number, u: number): Te;
    getEtype(v: number, u: number): EType;
    getEdge(v: number, u: number): Te;
    getEdgeWeight(v: number, u: number): number;
}