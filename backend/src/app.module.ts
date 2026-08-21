import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationalUnitModule } from './modules/organizational-unit/organizational-unit.module';
import { GroupModule } from './modules/group/group.module';
import { ServiceModule } from './modules/service/service.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { TicketActivityModule } from './modules/ticket-activity/ticket-activity.module';
import { TimeTrackingModule } from './modules/time-tracking/time-tracking.module';
import { KnowledgeBaseModule } from './modules/knowledge-base/knowledge-base.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AuditModule } from './modules/audit/audit.module';
import { RoutingModule } from './modules/routing/routing.module';
import { WebsocketModule } from './modules/websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    OrganizationalUnitModule,
    GroupModule,
    ServiceModule,
    TicketModule,
    TicketActivityModule,
    TimeTrackingModule,
    KnowledgeBaseModule,
    NotificationModule,
    AuditModule,
    RoutingModule,
    WebsocketModule,
  ],
})
export class AppModule {}
