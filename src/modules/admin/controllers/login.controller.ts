import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { RoleGuard } from 'src/common/auth/guards/role.guard';
import { LoginDTO } from 'src/common/dto/login';
import { LoginService } from '../services/login.service';
import { ApiCreatedResponse, ApiServiceUnavailableResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AdminResponse } from 'src/common/doc/Decorator/response.Decorator';

@ApiTags('admin')
@Controller('admin')
export class LoginController {
    constructor(private loginService : LoginService){}
    
    @Post('login')
    @AdminResponse("login")
    login(@Body() loinDTO: LoginDTO){
        return this.loginService.login(loinDTO)
    }
}
