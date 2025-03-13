import {atom} from 'jotai';
import {CreateReservationDto} from '@/sdk/generated';

export type ReservationSummary = {
  totalAmount: number;
  totalNights: number;
  rate: number;
};

export type ReservationAtom = ReservationSummary & CreateReservationDto;

export const reservationAtom = atom<ReservationAtom | null>(null);
