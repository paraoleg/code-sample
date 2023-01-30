import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '@modules/auth/guard/local-auth.guard';
import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { UserService } from '@modules/user/user.service';
import { AuthService } from '@modules/auth/auth.service';
import { BaseController } from '@common/base.controller';
import { ApiResponseWrapper } from '@common/http/wrappers/apiResponseWrapper';
import { ApiErrorResponseWrapper } from '@common/http/wrappers/apiErrorResponseWrapper';
import { ResponseAuthDto } from '@modules/auth/dto/response.dto';
import { SignInDto } from '@modules/auth/dto/sign-in.dto';

const PATH = 'auth';

@ApiTags(PATH)
@Controller(PATH)
@ApiExtraModels(SignUpDto)
export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponseWrapper(ResponseAuthDto)
  @ApiErrorResponseWrapper({ status: HttpStatus.UNAUTHORIZED })
  public async signIn(@Body() signInDto: SignInDto, @Request() req) {
    return req.user;
  }

  @Post('signup')
  @ApiResponseWrapper(ResponseAuthDto)
  @ApiErrorResponseWrapper({ status: HttpStatus.UNAUTHORIZED })
  @ApiErrorResponseWrapper({ status: HttpStatus.UNPROCESSABLE_ENTITY })
  public async signUp(@Body() signupDto: SignUpDto): Promise<ResponseAuthDto> {
    const user = await this.userService.findOneByEmail(signupDto.email);
    if (user) {
      throw new UnprocessableEntityException(
        `You're email ${signupDto.email} already exists`,
      );
    }

    const newUser = await this.authService.signUpNewUser(signupDto);
    const tokenData = await this.authService.getTokens(newUser);
    return {
      result: {
        tokenData,
        ...this.authService.prepareUserData(newUser),
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiResponseWrapper(ResponseAuthDto)
  @ApiErrorResponseWrapper({ status: HttpStatus.UNAUTHORIZED })
  public getProfile(@Request() req) {
    return req.user;
  }
}
