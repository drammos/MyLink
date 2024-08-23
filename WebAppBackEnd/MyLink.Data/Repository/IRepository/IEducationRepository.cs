﻿using MyLink.Models;
using MyLink.Models.DTOS;


namespace MyLink.Data.Repository.IRepository
{
    public interface IEducationRepository: IRepositoryBase<Education>
    {
        public Education Update(UpdateEducationDTO updateEducationDTO);
    }
}