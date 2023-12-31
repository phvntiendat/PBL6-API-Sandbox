import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAppointmentDto, PaginationAppointmentDto } from './appointment.dto';
import { AppointmentService } from './appointment.service';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';

 @Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('mentee')
    async createAppointment(@Req() req: any, @Body(new ValidationPipe()) appointment: CreateAppointmentDto) {

        return this.appointmentService.createAppointment(req.user, appointment);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllUsersAppointments(@Req() req: any, @Query() { page, limit }: PaginationAppointmentDto) {
        return this.appointmentService.getAllUsersAppointments(req.user._id, page, limit )
    }

    @Get('pending')
    @UseGuards(AuthGuard('jwt'))
    async getAllUsersPendingAppointments(@Req() req: any, @Query() { page, limit }: PaginationAppointmentDto) {
        return this.appointmentService.getAllUserPendingAppointments(req.user._id, page, limit )
    }

    @Get('canceled')
    @UseGuards(AuthGuard('jwt'))
    async getAllUsersCanceledAppointments(@Req() req: any, @Query() { page, limit }: PaginationAppointmentDto) {
        return this.appointmentService.getAllUserCanceledAppointments(req.user._id, page, limit )
    }

    @Get('confirmed')
    @UseGuards(AuthGuard('jwt'))
    async getAllUsersConfirmedAppointments(@Req() req: any, @Query() { page, limit }: PaginationAppointmentDto) {
        return this.appointmentService.getAllUserConfirmedAppointments(req.user._id, page, limit )
    }

    @Get('finished')
    @UseGuards(AuthGuard('jwt'))
    async getAllUsersFinishedAppointments(@Req() req: any, @Query() { page, limit }: PaginationAppointmentDto) {
        return this.appointmentService.getAllUserFinishedAppointments(req.user._id, page, limit )
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    getAppointmentById(@Req() req: any, @Param('id') id: string) {
        console.log(req.user);

        return this.appointmentService.getAppointmentById(req.user, id);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('mentor')
    @Patch(':id/confirm')
    async confirmAppointment(@Req() req: any, @Param('id') id: string) {
        return this.appointmentService.confirmAppointment(req.user, id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/cancel')
    async cancelAppointment(@Req() req: any, @Param('id') id: string) {
        return this.appointmentService.cancelAppointment(req.user, id)
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('mentor')
    @Patch(':id/finish')
    async finishAppointment(@Req() req: any, @Param('id') id: string) {
        return this.appointmentService.finishAppointment(req.user, id)
    }

}
