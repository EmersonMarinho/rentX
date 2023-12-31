import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificatonAlreadyExits =
      await this.specificationRepository.findByName(name);

    if (specificatonAlreadyExits) {
      throw new AppError("Specification already exists!");
    }

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
