using System.ComponentModel.DataAnnotations;

namespace InformationManagment.Core.Entities
{
    public class Menu : BaseEntity
    {
           [Required]
           public string MenuName { get; set; }

           [Required]
           public string Url { get; set; }

           [Required]
           public string Icon { get; set; }

           public int OrderNo { get; set; }

           public int? ParentId { get; set; }

           public bool IsParent { get; set; }

           public ICollection<MenuRole> MenuRoles { get; set; }
    }
}
